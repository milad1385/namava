import UserModel from "@/src/models/user";
import connectToDB from "@/src/configs/db";
import { verifyAccessToken } from "./auth";
import { cookies } from "next/headers";
import { unlink } from "fs";
import path from "path";
const authUser = async () => {
  connectToDB();
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    return false;
  }

  const tokenPayload: any = verifyAccessToken(token);

  if (!tokenPayload) {
    return false;
  }

  const user = await UserModel.findOne(
    { email: tokenPayload?.email },
    "-password"
  ).populate("profiles");

  return user;
};

const checkIsAdmin = async () => {
  connectToDB();
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    return false;
  }

  const tokenPayload: any = verifyAccessToken(token);

  if (!tokenPayload) {
    return false;
  }

  const user = await UserModel.findOne({ email: tokenPayload?.email });

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
