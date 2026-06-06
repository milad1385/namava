"use server";
import path from "path";
import { authUser } from "@/src/utils/serverHelper";
import ProfileModel from "@/src/models/profile";
import UserModel from "@/src/models/user";
import { writeFileSync } from "fs";
import connectToDB from "@/src/configs/db";
import { revalidatePath } from "next/cache";
import { TResponse } from "../types";
import { hashPassword, verifyPassword } from "@/src/utils/auth";
export const addNewProfile = async (formData: FormData) => {
  try {
    connectToDB();
    const user = await authUser();

    if (!user) {
      return {
        message: "لطفا لاگین کنید",
        status: 401,
      };
    }

    if (user.profileLimitCount === 0) {
      return {
        message: "شما تعداد مجاز پروفایل ساخته اید",
        status: 403,
      };
    }

    const name = formData.get("name") as string;
    const image = formData.get("image") as any;
    const isKid = formData.get("isKid") as string;

    if (!name || !image) {
      return {
        message: "تمام فیلد ها را وارد کنید",
        status: 422,
      };
    }

    const fileName = Date.now() + image.name;
    let imageText = `/uploads/${fileName}`;
    const imagePath = path.join(process.cwd(), "public/uploads/" + fileName);
    const buffer = Buffer.from(await image.arrayBuffer());
    writeFileSync(imagePath, buffer);

    const profile = await ProfileModel.create({
      name,
      image: imageText,
      user: user._id,
      ages: isKid ? 7 : 18,
      type: isKid ? "kid" : "adult",
    });

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          profiles: profile._id,
        },
        profileLimitCount: user.profileLimitCount - 1,
      }
    );

    revalidatePath("/profile-list");

    return {
      message: "پروفایل با موفقیت ساخته شد",
      status: 201,
    };
  } catch (error) {
    return {
      message: "اتصال خودتان را به اینترنت چک کنید",
      status: 500,
    };
  }
};

export const deletePasswordProfile = async (id: string): Promise<TResponse> => {
  try {
    connectToDB();
    const user = await authUser();
    if (!user) {
      return {
        message: "ابتدا لاگین کنید",
        status: 401,
      };
    }
    await ProfileModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          password: "",
          isLock: false,
        },
      }
    );

    revalidatePath(`/profile-list-edit/${id}`);

    return {
      message: "قفل پروفایل با موفقیت برداشته شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};

export const addPasswordInProfile = async (
  id: string,
  password: string
): Promise<TResponse> => {
  try {
    connectToDB();
    connectToDB();
    const user = await authUser();
    if (!user) {
      return {
        message: "ابتدا لاگین کنید",
        status: 401,
      };
    }

    const hashedPassword = await hashPassword(password);
    await ProfileModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          password: hashedPassword,
          isLock: true,
        },
      }
    );

    revalidatePath(`/profile-list-edit/${id}`);

    return {
      message: "قفل پروفایل با موفقیت اضافه شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};

export const updateProfile = async (data: FormData) => {
  try {
    connectToDB();

    const { age, profileImage, limitesMovies, profileId, profileName }: any =
      Object.fromEntries(data);

    const isNew = typeof profileImage === "object" ? true : false;
    console.log(isNew);

    let imageText = null;
    if (isNew) {
      imageText = `/uploads/${Date.now() + profileImage.name}`;
      const mainPath = path.join(process.cwd(), "public" + imageText);
      const mainBuffer = Buffer.from(await profileImage.arrayBuffer());
      writeFileSync(mainPath, mainBuffer);
    }

    await ProfileModel.findOneAndUpdate(
      { _id: profileId },
      {
        $set: {
          image: imageText ? imageText : profileImage,
          ages: age,
          name: profileName,
          limitsMovies: JSON.parse(limitesMovies),
        },
      }
    );

    revalidatePath(`/profile-list-edit/${profileId}`);

    return {
      message: "پروفایل با موفقیت بروزرسانی شد",
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};

export const checkUserProfilePassword = async (
  profileId: string,
  password: string
): Promise<TResponse> => {
  try {
    await connectToDB();
    const profile = await ProfileModel.findOne({ _id: profileId });
    const isValidPassword = await verifyPassword(password, profile.password);

    if(!isValidPassword){
      return {
        message: "رمز پروفایل نادرست میباشد",
        status: 404,
      };
    }

    return {
      message: "رمز عبور صحیح میباشد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};
