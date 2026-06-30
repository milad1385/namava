"use server";
import UserModel from "@/src/models/user";
import ProfileModel from "@/src/models/profile";
import {
  generateAccessToken,
  hashPassword,
  verifyPassword,
} from "@/src/utils/auth";
import { cookies } from "next/headers";
import connectToDB from "@/src/configs/db";
import { Login, User } from "@/src/validators/frontend";
import { redirect } from "next/navigation";
import { ActionResponse } from "../types";

interface ISignup {
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  username?: string;
}

interface ISignin {
  identifier?: string;
  password?: string;
}

export const signUp = async (body: ISignup) => {
  try {
    connectToDB();
    const { name, phone, email, password, username } = body;
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
    const accessToken = generateAccessToken({ email });
    const usersCount = await UserModel.countDocuments();

    let user = new UserModel({
      name,
      phone,
      username,
      password: hashedPassword,
      email,
      role: usersCount > 0 ? "USER" : "ADMIN",
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

    const profileID = user.profiles[0];

    cookies().set({
      name: "profile",
      value: profileID,
      path: "/",
    });

    cookies().set({
      name: "accessToken",
      value: `${accessToken}`,
      httpOnly: true,
      path: "/",
      maxAge: 432000,
    });

    return {
      message: "کاربر با موفقیت ثبت نام شد",
      status: 201,
    };
  } catch (error) {
    return {
      message: "سرور با مشکل مواجه شده",
      error: true,
    };
  }
};

export const signIn = async (body: ISignin) => {
  const { identifier, password } = body;
  try {
    connectToDB();
    const validateFields = Login.safeParse(body);

    if (!validateFields.success) {
      return {
        message: validateFields.error.flatten().fieldErrors,
        status: 422,
      };
    }

    const user = await UserModel.findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
        { username: identifier },
      ],
    });

    if (!user) {
      return {
        message: "کاربری با این اطلاعات یافت نشد ",
        status: 404,
      };
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return {
        message: "کاربری با این اطلاعات یافت نشد ",
        status: 404,
      };
    }

    const accessToken = generateAccessToken({ email: user.email });

    const profileID = user.profiles[0];

    cookies().set({
      name: "profile",
      value: profileID,
      path: "/",
    });

    cookies().set({
      name: "accessToken",
      value: `${accessToken}`,
      httpOnly: true,
      path: "/",
    });

    return {
      message: "کاربر با موفقیت وارد شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "سرور با مشکل مواجه شده",
      error: true,
    };
  }
};

export const logout = async () => {
  try {
    cookies().set({ name: "accessToken", value: "", maxAge: 0 });
    cookies().delete("profile");
    redirect("/");
  } catch (error) {
    return {
      message: "سرور با مشکل مواجه شده",
      error: true,
    };
  }
};

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;

export const sendResetPasswordEmail = async (
  _prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> => {
  const email = formData.get("email");
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/forgot`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );

    if (response.status === 404) {
      return { message: "کاربری با این ایمیل یافت نشد", error: true };
    }

    const data = await response.json();

    if (!response.ok) {
      return { message: "خطا در ارسال لینک بازیابی", error: true };
    }
    return { message: "ایمیل با موفقیت برای شما ارسال شد", success: true };
  } catch (error) {
    return { message: "سرور با مشکل مواجه شده", error: true };
  }
};
