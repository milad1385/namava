"use server";

import connectToDB from "@/src/configs/db";
import ArticleModel from "@/src/models/article";
import { authUser, checkIsAdmin, uploadFile } from "@/src/utils/serverHelper";
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
      isDraft,
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
      writeFileSync(imagePath, buffer as any);
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
      isAccept: isDraft ? false : true,
      isDraft: isDraft ? true : false,
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

export const updateArticle = async (id: string, data: FormData) => {
  try {
    await connectToDB();

    if (!(await checkIsAdmin())) {
      return {
        message: "این مسیر فقط برای ادمین های سایت مجاز است",
        status: 403,
      };
    }

    const existingArticle = await ArticleModel.findById(id);
    if (!existingArticle) {
      return {
        message: "مقاله مورد نظر یافت نشد",
        status: 404,
      };
    }

    const title = data.get("title") as string;
    const link = data.get("link") as string;
    const readingTime = data.get("readingTime") as string;
    const tags = data.get("tags") as string;
    const movie = data.get("movie") as string;
    const image = data.get("image") as File | null;
    const content = data.get("content") as string;
    const shortDesc = data.get("shortDesc") as string;
    const isDraft = data.get("isDraft") as string;

    if (!title || !link || !readingTime || !tags || !content || !shortDesc) {
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

    let imageName = existingArticle.image;
    if (image && image instanceof File) {
      imageName = await uploadFile(image, imageName, "article");
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      id,
      {
        title,
        link,
        readingTime,
        tags: tags.split("،").filter((t: string) => t.trim() !== ""),
        movie,
        image: imageName,
        content,
        creator: user._id,
        shortDesc,
        isAccept: isDraft ? false : true,
        isDraft: isDraft ? true : false,
      },
      { new: true, runValidators: true },
    );

    revalidatePath("/p-admin/articles");
    revalidatePath(`/p-admin/articles/${id}`);

    return {
      message: "مقاله با موفقیت بروزرسانی شد",
      status: 200,
      data: updatedArticle,
    };
  } catch (error) {
    console.error("خطا در بروزرسانی مقاله:", error);
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

export const changeArticleStatus = async (id: string) => {
  try {
    await connectToDB();
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
        message: "مقاله یافت نشد",
        status: 404,
      };
    }

    const updatedArticle = await ArticleModel.findOneAndUpdate(
      { _id: article._id },
      {
        isAccept: !article.isAccept,
        isDraft: !article.isDraft,
      },
      { new: true },
    );

    revalidatePath("/p-admin/articles");

    return {
      message: `مقاله با موفقیت ${updatedArticle.isAccept ? "تایید" : "رد"} شد.`,
      status: 200,
    };
  } catch (error) {
    return {
      message: "لطفا اتصال اینترنت خود را چک کنید",
      status: 500,
    };
  }
};
