"use server";

import connectToDB from "@/src/configs/db";
import ArticleModel from "@/src/models/article";
import { authUser, checkIsAdmin } from "@/src/utils/serverHelper";
import { unlink, writeFileSync } from "fs";
import { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";
import path from "path";

export const createNewArticle = async (data: FormData) => {
  try {
    connectToDB();
    if (!checkIsAdmin()) {
      return {
        message: "این مسیر فقط برای ادمین های سایت مجاز است",
        status: 403,
      };
    }

    const {
      title,
      link,
      readingTime,
      tags,
      movie,
      image,
      content,
      shortDesc,
    }: any = Object.fromEntries(data);

    if (!title || !link || !readingTime || !tags || !image || !content) {
      return {
        message: "فیلد های مورد نظر را به درستی وارد کنید",
        status: 422,
      };
    }

    const user = await authUser();

    if (!user) {
      return {
        message: "لطفا ابتدا لاگین کنید",
        status: 401,
      };
    }

    let imageName = undefined;
    if (image !== "undefined") {
      const fileName = Date.now() + image.name;
      imageName = `/uploads/${fileName}`;
      const imagePath = path.join(process.cwd(), "public/uploads/" + fileName);
      const buffer = Buffer.from(await image.arrayBuffer());
      writeFileSync(imagePath, buffer);
    }

    const article = await ArticleModel.create({
      title,
      link,
      readingTime,
      tags: tags.split("،"),
      movie,
      image: imageName,
      content,
      creator: user._id,
      shortDesc,
    });

    revalidatePath("/p-admin/articles");

    return {
      message: "مقاله با موفقیت ساخته شد",
      status: 201,
      data: article,
    };
  } catch (error) {
    return {
      message: "لطفا اتصال اینترنت خود را بررسی کنید",
      status: 500,
    };
  }
};

export const deleteArticle = async (id: string) => {
  try {
    connectToDB();
    if (!isValidObjectId(id)) {
      return {
        message: "لطفا یک ایدی معتبر ارسال کنید",
        status: 422,
      };
    }

    if (!checkIsAdmin()) {
      return {
        message: "این روت فقط برای ادمین ها در دسترس است",
        status: 404,
      };
    }

    const article = await ArticleModel.findOne({ _id: id });
    if (!article) {
      return {
        message: "این مقاله در سایت یافت نشد",
        status: 404,
      };
    }

    await ArticleModel.findByIdAndDelete(`${id}`);

    unlink(path.join(process.cwd(), "public/" + article.image), (err) => {
      if (err) {
        console.log(err);
      }
    });

    revalidatePath("/p-admin/articles");

    return {
      message: "مقاله با موفقیت حذف شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "لطفا اتصال اینترنت خود را چک کنید",
      status: 500,
    };
  }
};
