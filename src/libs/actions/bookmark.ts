"use server";
import connectToDB from "@/src/configs/db";
import BookmarkModel from "@/src/models/bookmark";
import { TResponse } from "../types";
import { authUser } from "@/src/utils/serverHelper";
import { revalidatePath } from "next/cache";

export const addOrDeleteBookmark = async (
  movieId: string
): Promise<TResponse> => {
  try {
    connectToDB();

    const user = await authUser();
    if (!user) {
      return {
        message: "برای اضافه کردن به بوک مارک ها ابتدا لاگین کنید",
        status: 401,
      };
    }

    const isExistBookmark = await BookmarkModel.findOne({
      user: user._id,
      movie: movieId,
    });

    if (!isExistBookmark) {
      await BookmarkModel.create({
        user: user._id,
        movie: movieId,
      });
      revalidatePath("/bookmarks");
      return {
        message: "با موفقیت به بوک مارک ها اضافه شد",
        status: 201,
      };
    } else {
      await BookmarkModel.findOneAndDelete({ user: user._id, movie: movieId });
      revalidatePath("/bookmarks");
      return {
        message: "این بوک مارک با موفقیت حذف شد",
        status: 200,
      };
    }
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};
