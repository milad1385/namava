import UserModel from "@/src/models/user";
import connectToDB from "@/src/configs/db";
import { verifyAccessToken } from "./auth";
import { cookies } from "next/headers";
import { unlink } from "fs";
import path from "path";
import ProfileModel, { schema } from "@/src/models/profile";
import { unlinkSync, existsSync } from "fs";
import mongoose from "mongoose";
import { TFileInput } from "../libs/types";


const authUser = async () => {
  await connectToDB();
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    return false;
  }

  const tokenPayload: any = verifyAccessToken(token);

  if (!tokenPayload) {
    return false;
  }
  if (!mongoose.models.Profile) {
    mongoose.model("Profile", schema);
  }

  const user = await UserModel.findOne(
    { email: tokenPayload?.email },
    "-password",
  )
    .populate("profiles")
    .populate({
      path: "favGenre",
      select: "_id title",
      populate: {
        path: "parrent",
        select: "_id title link image",
      },
    });
  return user;
};

const checkIsAdmin = async () => {
  await connectToDB();
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    return false;
  }

  const tokenPayload: any = verifyAccessToken(token);

  if (!tokenPayload) {
    return false;
  }

  const user = await UserModel.findOne({ email: tokenPayload?.email });
  if (!user) {
    return false;
  }

  return user.role === "ADMIN" ? true : false;
};

const deleteImage = async (imagePath: any) => {
  try {
    unlink(path.join(process.cwd(), "public/" + imagePath), (err) => {
      if (err) {
        console.log(err);
      } else {
        return true;
      }
    });
  } catch (error) {
    return error;
  }
};

export const deleteFiles = (files: TFileInput): number => {
  if (!files) return 0;

  const fileArray = Array.isArray(files) ? files : [files];

  const validFiles = fileArray.filter(
    (file): file is string => typeof file === "string" && file.trim() !== ""
  );

  if (validFiles.length === 0) return 0;

  let deletedCount = 0;

  for (const file of validFiles) {
    try {
      const filePath = path.join(process.cwd(), "public", file);
      
      if (existsSync(filePath)) {
        unlinkSync(filePath);
        deletedCount++;
        console.log(`✅ فایل حذف شد: ${file}`);
      } else {
        console.log(`⚠️ فایل وجود ندارد: ${file}`);
      }
    } catch (err) {
      console.error(`❌ خطا در حذف فایل ${file}:`, err);
    }
  }

  return deletedCount;
};

export { authUser, checkIsAdmin, deleteImage };
