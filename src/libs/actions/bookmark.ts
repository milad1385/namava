"use server";
import connectToDB from "@/src/configs/db";
import BookmarkModel from "@/src/models/bookmark";
import { TResponse } from "../types";
import { authUser } from "@/src/utils/serverHelper";
import { revalidatePath } from "next/cache";

export const addOrDeleteBookmark = async (
  movieId: string,
  isMain?: boolean,
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
    }).populate("movie", "_id link type");

    if (!isExistBookmark) {
      const newBookmark = await BookmarkModel.create({
        user: user._id,
        movie: movieId,
      });
      const createdBookmark = await BookmarkModel.findById(
        newBookmark._id,
      ).populate("movie", "_id link type");

      if (isMain && createdBookmark) {
        console.log(
          "link => add",
          `/${createdBookmark.movie.type === "film" ? "movie" : "series"}/${createdBookmark.movie.link}`,
        );
        revalidatePath(
          `/${createdBookmark.movie.type === "film" ? "movie" : "series"}/${createdBookmark.movie.link}`,
        );
      }
      return {
        message: "با موفقیت به بوک مارک ها اضافه شد",
        status: 201,
      };
    } else {
      await BookmarkModel.findOneAndDelete({ user: user._id, movie: movieId });
      if (isMain) {
        console.log(
          "link => delete ",
          `/${isExistBookmark.movie.type === "film" ? "movie" : "series"}/${isExistBookmark.movie.link}`,
        );
        revalidatePath(
          `/${isExistBookmark.movie.type === "film" ? "movie" : "series"}/${isExistBookmark.movie.link}`,
        );
      }
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
