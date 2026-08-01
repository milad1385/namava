"use server";

import connectToDB from "@/src/configs/db";
import SeasonModel from "@/src/models/Season";
import MovieModel from "@/src/models/movie";
import EpisodeModel from "@/src/models/episode";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { isValidObjectId } from "mongoose";
import {
  checkIsAdmin,
  deleteImage,
  uploadFile,
} from "@/src/utils/serverHelper";
import { TResponse } from "../types";

export const createNewEpisode = async (data: FormData) => {
  try {
    connectToDB();

    const image: any = data.get("image");
    const video: any = data.get("video");
    const series = data.get("series");
    const seasonNumber = Number(data.get("season"));

    let imageName = undefined;
    if (image !== "undefined") {
      const fileName = Date.now() + image.name;
      imageName = `/uploads/${fileName}`;
      const imagePath = path.join(process.cwd(), "public/uploads/" + fileName);
      const buffer = Buffer.from(await image.arrayBuffer());
      writeFileSync(imagePath, buffer as any);
    }

    let videoName = undefined;

    if (videoName !== "undefined") {
      const fileName = Date.now() + video.name;
      videoName = `/uploads/${fileName}`;
      const imagePath = path.join(process.cwd(), "public/uploads/" + fileName);
      const buffer = Buffer.from(await video.arrayBuffer());
      writeFileSync(imagePath, buffer as any);
    }

    const season = new SeasonModel({
      seasonNumber,
      series,
    });

    const existSeason = await SeasonModel.findOne({ series, seasonNumber });

    const episode = new EpisodeModel({
      title: data.get("title"),
      description: data.get("description"),
      link: data.get("link"),
      time: data.get("time"),
      image: imageName,
      video: videoName,
      season: existSeason ? existSeason._id : season._id,
      series: data.get("series"),
    });

    if (!existSeason) {
      season.episodes.push(episode._id);
      await season.save();
    } else {
      await SeasonModel.findOneAndUpdate(
        { series, seasonNumber },
        {
          $push: {
            episodes: episode._id,
          },
        },
      );
    }

    await episode.save();

    if (!existSeason) {
      await MovieModel.findOneAndUpdate(
        { _id: series },
        {
          $push: {
            seasons: season._id,
          },
        },
      );
    }

    revalidatePath("/p-admin/series");

    return {
      message: "قسمت جدید با موفقیت ایجاد شد",
      status: 201,
    };
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت بررسی کنید",
      status: 500,
    };
  }
};

export const updateEpisode = async (id: string, data: FormData) => {
  try {
    await connectToDB();

    if (!(await checkIsAdmin())) {
      return {
        message: "شما دسترسی برای ویرایش قسمت را ندارید",
        status: 403,
      };
    }

    const existingEpisode = await EpisodeModel.findById(id);
    if (!existingEpisode) {
      return {
        message: "قسمت مورد نظر یافت نشد",
        status: 404,
      };
    }

    const image = data.get("image") as File | null;
    const video = data.get("video") as File | null;
    const series = data.get("series") as string;
    const seasonNumber = Number(data.get("season"));
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const link = data.get("link") as string;
    const time = data.get("time") as string;

    console.log("📌 درخواست ویرایش قسمت:");
    console.log("- قسمت ID:", id);
    console.log("- سریال:", series);
    console.log("- شماره فصل جدید:", seasonNumber);

    let imageName = existingEpisode.image;
    let videoName = existingEpisode.video;

    if (image) {
      imageName = await uploadFile(image, imageName, "episode_image");
    }
    if (video) {
      videoName = await uploadFile(video, videoName, "episode_video");
    }

    // ========== پیدا کردن یا ایجاد فصل جدید ==========
    let newSeason = await SeasonModel.findOne({ series, seasonNumber });

    if (!newSeason) {
      console.log("⚠️ فصل جدید پیدا نشد، ایجاد میشه...");
      newSeason = new SeasonModel({
        seasonNumber,
        series,
        episodes: [],
      });
      await newSeason.save();

      await MovieModel.findOneAndUpdate(
        { _id: series },
        { $push: { seasons: newSeason._id } },
      );
    }

    console.log("✅ فصل جدید:", {
      id: newSeason._id,
      seasonNumber: newSeason.seasonNumber,
      episodesCount: newSeason.episodes?.length || 0,
    });

    // ========== ✅ منطق تغییر فصل ==========
    const oldSeasonId = existingEpisode.season?.toString();
    const newSeasonId = newSeason._id.toString();

    console.log("🔄 تغییر فصل:");
    console.log("- فصل قبلی:", oldSeasonId);
    console.log("- فصل جدید:", newSeasonId);

    if (oldSeasonId && oldSeasonId !== newSeasonId) {
      console.log("✅ فصل تغییر کرده، در حال بروزرسانی...");

      // حذف از فصل قبلی
      await SeasonModel.findByIdAndUpdate(oldSeasonId, {
        $pull: { episodes: existingEpisode._id },
      });

      // اضافه به فصل جدید
      await SeasonModel.findByIdAndUpdate(newSeasonId, {
        $push: { episodes: existingEpisode._id },
      });
    } else {
      console.log("ℹ️ فصل تغییری نکرده");
    }

    // ========== بروزرسانی خود قسمت ==========
    const updatedEpisode = await EpisodeModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        link,
        time,
        image: imageName,
        video: videoName,
        season: newSeason._id,
        series,
      },
      { new: true, runValidators: true },
    );

    console.log("✅ قسمت بروزرسانی شد:", {
      id: updatedEpisode._id,
      season: updatedEpisode.season,
    });

    revalidatePath("/p-admin/series");
    revalidatePath(`/p-admin/series/${series}`);

    return {
      message: "قسمت با موفقیت بروزرسانی شد",
      status: 200,
    };
  } catch (error) {
    console.error("❌ خطا در بروزرسانی قسمت:", error);
    return {
      message: "اتصال خود را به اینترنت بررسی کنید",
      status: 500,
    };
  }
};

export const deleteEpisode = async (id: string) => {
  try {
    connectToDB();
    if (!isValidObjectId(id)) {
      return {
        message: "ای دی مورد نظر معتبر نمیباشد",
        status: 422,
      };
    }

    if (!checkIsAdmin()) {
      return {
        message: "این روت فقط برای کاربران ادمین است",
        status: 403,
      };
    }

    const episode = await EpisodeModel.findOne({ _id: id });
    if (!episode) {
      return {
        message: "این قسمت برای حذف یافت نشد",
        status: 404,
      };
    }

    await deleteImage(episode.image);
    await deleteImage(episode.video);

    const mainSeason = await SeasonModel.findOne({ _id: episode.season });

    if (mainSeason.episodes.length <= 1) {
      await SeasonModel.findByIdAndDelete(`${episode.season}`);
    } else {
      await SeasonModel.findOneAndUpdate(
        { _id: episode.season },
        {
          $pull: {
            episodes: episode._id,
          },
        },
      );
    }

    await EpisodeModel.findByIdAndDelete(`${id}`);

    revalidatePath(`/p-admin/series/${episode.series}`);

    return {
      message: "قسمت با موفقیت حذف شد",
      status: 200,
    };
  } catch (error) {
    return error;
  }
};

export const likeEpisode = async (
  episodeId: string,
  userId: string,
  seriesLink: string,
): Promise<TResponse> => {
  try {
    connectToDB();

    if (!userId) {
      return {
        message: "ابتدا لاگین کنید",
        status: 401,
      };
    }

    if (!isValidObjectId(episodeId)) {
      return {
        message: "ایدی مورد نظر معتبر نمیباشد",
        status: 422,
      };
    }

    const isLiked = await EpisodeModel.findOne({
      _id: episodeId,
      liked: { $in: userId },
    });

    const isDisLiked = await EpisodeModel.findOne({
      _id: episodeId,
      disliked: { $in: userId },
    });

    if (isDisLiked || isLiked) {
      await EpisodeModel.findOneAndUpdate(
        { _id: episodeId },
        {
          $pull: {
            liked: userId,
            disliked: userId,
          },
        },
      );
    } else {
      await EpisodeModel.findOneAndUpdate(
        { _id: episodeId },
        {
          $push: {
            liked: userId,
          },
        },
      );
    }
    // revalidatePath(`/series/${seriesLink}`);

    return {
      message: "با موفقیت این قسمت لایک شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};

export const dislikeEpisode = async (
  episodeId: string,
  userId: string,
  seriesLink: string,
): Promise<TResponse> => {
  try {
    connectToDB();

    if (!userId) {
      return {
        message: "ابتدا لاگین کنید",
        status: 401,
      };
    }

    if (!isValidObjectId(episodeId)) {
      return {
        message: "ایدی مورد نظر معتبر نمیباشد",
        status: 422,
      };
    }

    const isLiked = await EpisodeModel.findOne({
      _id: episodeId,
      liked: { $in: userId },
    });

    const isDisLiked = await EpisodeModel.findOne({
      _id: episodeId,
      disliked: { $in: userId },
    });

    if (isDisLiked) {
      await EpisodeModel.findOneAndUpdate(
        { _id: episodeId },
        {
          $pull: {
            disliked: userId,
          },
        },
      );
    } else if (isLiked) {
      await EpisodeModel.findOneAndUpdate(
        { _id: episodeId },
        {
          $pull: {
            liked: userId,
          },
        },
      );

      await EpisodeModel.findOneAndUpdate(
        { _id: episodeId },
        {
          $push: {
            disliked: userId,
          },
        },
      );
    } else {
      await EpisodeModel.findOneAndUpdate(
        { _id: episodeId },
        {
          $push: {
            disliked: userId,
          },
        },
      );
    }

    // revalidatePath(`/series/${seriesLink}`);

    return {
      message: "با موفقیت این قسمت دیس لایک شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};
