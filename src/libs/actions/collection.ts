"use server";
import connectToDB from "@/src/configs/db";
import CollcetionModel from "@/src/models/collection";
import { TResponse } from "../types";
import path from "path";
import { writeFileSync } from "fs";
import { checkIsAdmin, deleteImage } from "@/src/utils/serverHelper";
import { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

export const createCollection = async (
  data: FormData,
  movies: any,
): Promise<TResponse> => {
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
