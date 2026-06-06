"use server";
import connectToDB from "@/src/configs/db";
import CategoryModel from "@/src/models/category";
import { writeFileSync, unlink } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { isValidObjectId } from "mongoose";

export const addNewCategory = async (body: FormData) => {
  try {
    connectToDB();
    const { title, tags, link, parrent, image, desc }: any =
      Object.fromEntries(body);

    if (!title || !tags || !desc) {
      return {
        message: "لطفا همه فیلد ها را وارد کنید",
        status: 422,
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

    await CategoryModel.create({
      title,
      tags: tags.split("،"),
      link,
      parrent,
      description: desc,
      image: imageName,
    });

    revalidatePath("/p-admin/categories");

    return {
      message: "دسته بندی با موفقیت ساخته شد",
      status: 201,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "اتصال خود را به اینترنت چک کنید",
    };
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    if (isValidObjectId(categoryId)) {
      const category = await CategoryModel.findOne({ _id: categoryId });
      if (!category) {
        return {
          message: "این کتگوری وجود ندارد",
          status: 404,
        };
      }

      unlink(path.join(process.cwd(), "public/" + category.image), (err) => {
        if (err) {
          console.log(err);
        }
      });

      await CategoryModel.findByIdAndDelete(`${categoryId}`);

      revalidatePath("/p-admin/categories");
      return {
        message: "دسته بندی با موفقیت حذف شد",
        status: 200,
      };
    } else {
      return {
        message: "ایدی مورد نظر معتبر نمیباشد",
        status: 422,
      };
    }
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
    };
  }
};

export const deleteSubCategory = async (subCategoryId: string) => {
  try {
    connectToDB();
    if (isValidObjectId(subCategoryId)) {
      const subCategory = await CategoryModel.findOne({
        _id: subCategoryId,
      }).populate("parrent", "title");
      if (!subCategory) {
        return {
          message: "این کتگوری وجود ندارد",
          status: 404,
        };
      }

      await CategoryModel.findByIdAndDelete(`${subCategoryId}`);

      revalidatePath(`/p-admin/categories/${subCategory.parrent._id}`);
      return {
        message: "دسته بندی با موفقیت حذف شد",
        status: 200,
      };
    } else {
      return {
        message: "ایدی مورد نظر معتبر نمیباشد",
        status: 422,
      };
    }
  } catch (error) {
    return {
      message: "لطفا اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};
