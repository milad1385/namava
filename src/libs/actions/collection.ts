"use server";
import connectToDB from "@/src/configs/db";
import CollcetionModel from "@/src/models/collection";
import path from "path";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { checkIsAdmin, deleteImage } from "@/src/utils/serverHelper";
import { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";
import { TResponse } from "../types";

export const createCollection = async (
  data: FormData,
  movies: any,
) => {
  try {
    connectToDB();
    const {
      title,
      description,
      type,
      link,
      mainImage,
      deskBanner,
      mobileBanner,
      logo,
    } = Object.fromEntries(data);

    const moviesId = movies.map((movies: any) => movies.value);

    if (
      !title ||
      !description ||
      !link ||
      !mainImage ||
      !deskBanner ||
      !mobileBanner
    ) {
      return {
        message: "لطفا تمام فیلد ها را وارد کنید",
        status: 422,
      };
    }

    if (!checkIsAdmin()) {
      return {
        message: "این روت فقط برای کاربران ادمین است",
        status: 403,
      };
    }

    const mainImageFile = mainImage as File;
    const desktopBannerFile = deskBanner as File;
    const mobileBannerFile = mobileBanner as File;
    const logoFile = logo as File;

    let mainImageText = `/uploads/${Date.now() + mainImageFile.name}`;
    let mobileBannerText = `/uploads/${Date.now() + mobileBannerFile.name}`;
    let deskBannerText = `/uploads/${Date.now() + desktopBannerFile.name}`;
    let logoFileText = `/uploads/${Date.now() + logoFile.name}`;

    const mainPath = path.join(process.cwd(), "public" + mainImageText);
    const mainBuffer = Buffer.from(await mainImageFile.arrayBuffer());
    writeFileSync(mainPath, mainBuffer as any);

    const mobilePath = path.join(process.cwd(), "public" + mobileBannerText);
    const mobileBuffer = Buffer.from(await mobileBannerFile.arrayBuffer());
    writeFileSync(mobilePath, mobileBuffer as any);

    const deskPath = path.join(process.cwd(), "public" + deskBannerText);
    const deskBuffer = Buffer.from(await desktopBannerFile.arrayBuffer());
    writeFileSync(deskPath, deskBuffer as any);

    const logoPath = path.join(process.cwd(), "public" + logoFileText);
    const logoBuffer = Buffer.from(await logoFile.arrayBuffer());
    writeFileSync(logoPath, logoBuffer as any);

    await CollcetionModel.create({
      title,
      link,
      description,
      movies: moviesId,
      mainImage: mainImageText,
      desktopBanner: deskBannerText,
      mobileBanner: mobileBannerText,
      logo: logoFileText,
      type,
    });

    revalidatePath("/p-admin/collection");
    return {
      message: "موفقیت آمیز بود",
      status: 201,
    };
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};

export const updateCollection = async (
  id: string,
  data: FormData,
  movies: any,
): Promise<TResponse> => {
  try {
    await connectToDB();

    // ========== ۱. بررسی ادمین ==========
    if (!checkIsAdmin()) {
      return {
        message: "این روت فقط برای کاربران ادمین است",
        status: 403,
      };
    }

    // ========== ۲. گرفتن داده‌ها ==========
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const type = data.get("type") as string;
    const link = data.get("link") as string;
    const mainImage = data.get("mainImage") as File | null;
    const deskBanner = data.get("deskBanner") as File | null;
    const mobileBanner = data.get("mobileBanner") as File | null;
    const logo = data.get("logo") as File | null;

    // ========== ۳. اعتبارسنجی فیلدهای اجباری ==========
    if (!title || !description || !link || !type) {
      return {
        message: "لطفا تمام فیلدهای اجباری را وارد کنید",
        status: 422,
      };
    }

    // ========== ۴. پیدا کردن مجموعه ==========
    const existingCollection = await CollcetionModel.findById(id);
    if (!existingCollection) {
      return {
        message: "مجموعه مورد نظر یافت نشد",
        status: 404,
      };
    }

    // ========== ۵. آپلود فایل‌های جدید (اختیاری) ==========
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    mkdirSync(uploadDir, { recursive: true });

    let mainImageText = existingCollection.mainImage;
    let deskBannerText = existingCollection.desktopBanner;
    let mobileBannerText = existingCollection.mobileBanner;
    let logoText = existingCollection.logo;

    // ========== ✅ تابع کمکی برای آپلود (با async/await) ==========
    const uploadFile = async (file: File | null, oldPath: string, prefix: string): Promise<string> => {
      if (!file || !(file instanceof File)) return oldPath;

      // حذف فایل قدیمی
      if (oldPath) {
        const oldFilePath = path.join(process.cwd(), "public", oldPath);
        if (existsSync(oldFilePath)) {
          unlinkSync(oldFilePath);
        }
      }

      // ذخیره فایل جدید
      const fileName = `${prefix}_${Date.now()}_${file.name}`;
      const filePath = `/uploads/${fileName}`;
      const fullPath = path.join(process.cwd(), "public", filePath);
      
      // ✅ استفاده از await برای arrayBuffer()
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      writeFileSync(fullPath, buffer as any);

      return filePath;
    };

    // ========== ۶. ✅ آپلود هر فایل با await ==========
    if (mainImage) {
      mainImageText = await uploadFile(mainImage, mainImageText, "main");
    }
    if (deskBanner) {
      deskBannerText = await uploadFile(deskBanner, deskBannerText, "desk");
    }
    if (mobileBanner) {
      mobileBannerText = await uploadFile(mobileBanner, mobileBannerText, "mobile");
    }
    if (logo) {
      logoText = await uploadFile(logo, logoText, "logo");
    }

    // ========== ۷. تبدیل movies به آرایه آیدی ==========
    const moviesId = movies?.map((m: any) => m.value) || [];

    // ========== ۸. بروزرسانی در دیتابیس ==========
    await CollcetionModel.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description.trim(),
        link: link.trim(),
        type,
        movies: moviesId,
        mainImage: mainImageText,
        desktopBanner: deskBannerText,
        mobileBanner: mobileBannerText,
        logo: logoText,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    // ========== ۹. ری‌ولید کش ==========
    revalidatePath("/p-admin/collections");
    revalidatePath("/");

    return {
      message: "مجموعه با موفقیت بروزرسانی شد",
      status: 200,
    };
  } catch (error) {
    console.error("خطا در بروزرسانی مجموعه:", error);
    return {
      message: "خطا در ارتباط با سرور",
      status: 500,
    };
  }
};

export const deleteCollcetion = async (id: string): Promise<TResponse> => {
  try {
    connectToDB();

    if (!isValidObjectId(id)) {
      return {
        message: "ای دی مورد نظر معتبر نیست",
        status: 422,
      };
    }

    if (!checkIsAdmin()) {
      return {
        message: "این روت فقط برای کاربران ادمین است",
        status: 403,
      };
    }

    const collcetion = await CollcetionModel.findOne({ _id: id });

    if (!collcetion) {
      return {
        message: "مجموعه مورد نظر برای حذف پیدا نشد",
        status: 404,
      };
    }

    await deleteImage(collcetion.mainImage);
    await deleteImage(collcetion.desktopBanner);
    await deleteImage(collcetion.mobileBanner);

    await CollcetionModel.findOneAndDelete({ _id: id });

    return {
      message: "مجموعه با موفقیت حذف شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};
