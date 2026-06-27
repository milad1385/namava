"use server";
import UserModel from "@/src/models/user";
import ProfileModel from "@/src/models/profile";
import connectToDB from "@/src/configs/db";
import { revalidatePath } from "next/cache";
import { isValidObjectId } from "mongoose";
import { TUser, User } from "@/src/validators/frontend";
import { hashPassword } from "@/src/utils/auth";
import { authUser, checkIsAdmin } from "@/src/utils/serverHelper";
import { IUpdateUser, IUpdateUserWithFavGenre, TResponse } from "../types";

export const deleteUser = async (userId: string) => {
  try {
    connectToDB();

    if (!isValidObjectId(userId)) {
      return {
        message: "ایدی مد نظر معتبر نمی باشد",
        status: 422,
      };
    }

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return {
        message: "کاربری با این ایدی یافت نشد",
        status: 404,
      };
    }

    await UserModel.findByIdAndDelete(`${userId}`);
    await ProfileModel.deleteMany({ user: userId });

    revalidatePath("/p-admin/users");
    return {
      message: "کاربر با موفقیت حذف شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال اینترنت خود را بررسی کنید",
      status: 500,
    };
  }
};

export const createNewUser = async (body: TUser) => {
  try {
    connectToDB();
    const { name, username, phone, email, password, biography } = body;

    const validateFields = User.safeParse(body);

    if (!validateFields.success) {
      return {
        message: validateFields.error.flatten().fieldErrors,
        status: 422,
      };
    }

    const isUserExist = await UserModel.findOne({
      $or: [{ email }, { phone }, { username }],
    });

    if (isUserExist) {
      return {
        message: "کاربری با این مشخصات وجود دارد",
        status: 419,
      };
    }

    const hashedPassword = await hashPassword(password);

    let user = new UserModel({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
      biography,
    });

    const profiles = [
      {
        name: "بزرگسال",
        ages: 18,
        user: user._id,
      },
      {
        name: "کودک",
        ages: 7,
        user: user._id,
        image: `/uploads/kidProfile.png`,
        type: "kid",
      },
    ];

    const profileList = await ProfileModel.insertMany(profiles);

    profileList.forEach((profile) => {
      user.profiles.push(profile._id);
    });

    await user.save();

    revalidatePath("/p-admin/user");

    return {
      message: "کاربر با موفقیت ثبت نام شد",
      status: 201,
    };
  } catch (error) {
    return {
      message: "اتصال اینترنت خود را بررسی کنید",
      status: 500,
    };
  }
};

export const changeUserRole = async (id: string, role: string) => {
  try {
    if (!checkIsAdmin()) {
      return {
        message: "این روت فقط برای کاربران ادمین مجاز است",
        status: 403,
      };
    }

    await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: role === "ADMIN" ? "USER" : "ADMIN",
        },
      },
    );

    revalidatePath("/p-admin/users");

    return {
      message: "نقش کاربر با موفقیت تغییر کرد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال اینترنت خود را بررسی کنید",
      status: 500,
    };
  }
};

export const updateUser = async (
  userId: string,
  data: any,
): Promise<TResponse> => {
  try {
    if (!isValidObjectId(userId)) {
      return {
        message: "ایدی مد نظر معتبر نمی باشد",
        status: 422,
      };
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: data.name,
          username: data.username,
          email: data.email,
          password: hashedPassword,
          phone: data.phone,
          biography: data.biography,
        },
      },
    );

    if (!user) {
      return {
        message: "کاربر مورد نظر برای آپدیت یافت نشد",
        status: 404,
      };
    }

    revalidatePath(`/p-admin/users`);

    return {
      message: "کاربر مورد نظر با موفقیت آپدیت شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال اینترنت خود را بررسی کنید",
      status: 500,
    };
  }
};

export const updateUserInfo = async (data: IUpdateUser): Promise<TResponse> => {
  try {
    await connectToDB();
    const { name, province, biography, birthday } = data;
    const user = await authUser();
    if (!user) {
      return {
        message: "برای انجام آپدیت ابتدا لاگین کنید",
        status: 403,
      };
    }

    await UserModel.findOneAndUpdate(
      { _id: user?._id },
      {
        $set: {
          name,
          province,
          biography,
          birthday,
        },
      },
    );

    return {
      message: "اطلاعات کاربر با موفقیت آپدیت شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال اینترنت خود را بررسی کنید",
      status: 500,
    };
  }
};

export const editUserInfoWithFavGenre = async (
  data: IUpdateUserWithFavGenre,
): Promise<TResponse> => {
  try {
    await connectToDB();
    const user = await authUser();
    if (!user) {
      return {
        message: "برای انجام آپدیت ابتدا لاگین کنید",
        status: 403,
      };
    }
    const { email, phone, favGenre } = data;

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          email,
          phone,
          favGenre: favGenre !== "-1" ? favGenre : null,
        },
      },
    );

    return {
      message: "اطلاعات شما با موفقیت آپدیت شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال اینترنت خود را بررسی کنید",
      status: 500,
    };
  }
};
