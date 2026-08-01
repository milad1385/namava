import UserModel from "@/src/models/user";
import connectToDB from "@/src/configs/db";
import { verifyAccessToken } from "./auth";
import { cookies } from "next/headers";
import { unlink } from "fs";
import path from "path";
import ProfileModel, { schema } from "@/src/models/profile";
import mongoose from "mongoose";
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

export { authUser, checkIsAdmin, deleteImage };
