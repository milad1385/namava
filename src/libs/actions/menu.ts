"use server";
import connectToDB from "@/src/configs/db";
import MenuModel from "@/src/models/menu";
import { Menu, TMenu } from "@/src/validators/frontend";
import { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

export const createNewMenu = async (data: TMenu) => {
  try {
    connectToDB();
    const { title, link, parrent } = data;

    const validateFields = Menu.safeParse(data);
    if (!validateFields.success) {
      return {
        message: validateFields.error.flatten().fieldErrors,
        status: 422,
      };
    }
    await MenuModel.create({
      title,
      link,
      parrent: parrent || null,
    });

    revalidatePath("/p-admin/menus");

    return {
      message: "منو با موفقیت ساخته شد",
      status: 201,
    };
  } catch (error) {
    return { message: "اتصال اینترنت خود را چک کنید", status: 500 };
  }
};


export const updateMenu = async (id: string, data: TMenu) => {
  try {
    await connectToDB();

    const { title, link, parrent } = data;

    const validateFields = Menu.safeParse({ title, link, parrent });
    if (!validateFields.success) {
      return {
        message: validateFields.error.flatten().fieldErrors,
        status: 422,
      };
    }
    console.log("api => " , id);
    
    const existingMenu = await MenuModel.findById(id);
    if (!existingMenu) {
      return {
        message: "منو مورد نظر یافت نشد",
        status: 404,
      };
    }

    await MenuModel.findByIdAndUpdate(
      id,
      {
        title,
        link,
        parrent: parrent || null,
      },
      { new: true, runValidators: true }
    );

    revalidatePath("/p-admin/menus");
    revalidatePath("/"); 

    return {
      message: "منو با موفقیت بروزرسانی شد",
      status: 200,
    };
  } catch (error) {
    console.error("خطا در بروزرسانی منو:", error);
    return {
      message: "اتصال اینترنت خود را چک کنید",
      status: 500,
    };
  }
};

export const deleteMenu = async (id: string) => {
  try {
    connectToDB();
    if (!isValidObjectId(id)) {
      return {
        message: "از ای دی معتبر برای حذف منو استفاده کنید",
        status: 422,
      };
    }
    const menu = await MenuModel.findOne({ _id: id });
    if (!menu) {
      return {
        message: "منو مدنظر یافت نشد",
        status: 404,
      };
    }
    await MenuModel.findByIdAndDelete(`${id}`);
    revalidatePath("/p-admin/menus");

    return {
      status: 200,
      message: "منو با موفقیت حذف شد",
    };
  } catch (error) {
    return { message: "اتصال اینترنت خود را چک کنید", status: 500 };
  }
};
