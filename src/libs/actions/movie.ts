"use server";
import connectToDB from "@/src/configs/db";
import MovieModel from "@/src/models/movie";
import CollectionModel from "@/src/models/collection";
import SeasonModel from "@/src/models/Season";
import EpisodeModel from "@/src/models/episode";
import WatchHistoryModel from "@/src/models/watchHistory";
import BookmarkModel from "@/src/models/bookmark";
import { authUser, checkIsAdmin, deleteFiles } from "@/src/utils/serverHelper";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import { isValidObjectId } from "mongoose";
import { revalidatePath } from "next/cache";
import path from "path";
import { TResponse } from "../types";

type TStar = {
  value: string;
  label: string;
};

export const createNewMovie = async (data: FormData, stars: TStar[]) => {
  try {
    connectToDB();
    const auth = await authUser();

    const mainImage = data.get("mainImage") as File;
    const logo = data.get("logo") as File;
    const video = data.get("video") as File;
    const deskBanner = data.get("deskBanner") as File;
    const mobileBanner = data.get("mobileBanner") as File;
    const detailImages = data.getAll("detailImage") as File[];

    const actors = stars.map((star) => star.value);

    let mainImageText = `/uploads/${Date.now() + mainImage.name}`;
    let logoImageText = `/uploads/${Date.now() + logo.name}`;
    let videoText = `/uploads/${Date.now() + video.name}`;
    let deskBannerText = `/uploads/${Date.now() + deskBanner.name}`;
    let mobileBannerText = `/uploads/${Date.now() + mobileBanner.name}`;

    // main image upload
    const mainPath = path.join(process.cwd(), "public" + mainImageText);
    const mainBuffer = Buffer.from(await mainImage.arrayBuffer());
    writeFileSync(mainPath, mainBuffer as any);

    // finish main image upload

    // logo upload
    const logoPath = path.join(process.cwd(), "public" + logoImageText);

    const logoBuffer = Buffer.from(await logo.arrayBuffer());
    writeFileSync(logoPath, logoBuffer as any);

    // finish logo upload

    // video upload
    const videoPath = path.join(process.cwd(), "public" + videoText);
    const videoBuffer = Buffer.from(await video.arrayBuffer());
    writeFileSync(videoPath, videoBuffer as any);

    // finish video upload

    // upload desktop banner

    const desktopBannerPath = path.join(
      process.cwd(),
      "public" + deskBannerText,
    );
    const desktopBuffer = Buffer.from(await deskBanner.arrayBuffer());
    writeFileSync(desktopBannerPath, desktopBuffer as any);

    // finish upload desktop banner

    // upload mobile image

    const mobileBannerPath = path.join(
      process.cwd(),
      "public" + mobileBannerText,
    );
    const mobileBuffer = Buffer.from(await mobileBanner.arrayBuffer());
    writeFileSync(mobileBannerPath, mobileBuffer as any);

    // finish upload mobile image

    let detailImageList = [] as any;
    detailImages.forEach(async (image: any) => {
      let detailImageText = `/uploads/${Date.now() + image.name}`;
      detailImageList.push(detailImageText);
      const imagePath = path.join(process.cwd(), "public" + detailImageText);
      const buffer = Buffer.from(await image.arrayBuffer());
      writeFileSync(imagePath, buffer as any);
    });

    await MovieModel.create({
      title: data.get("title"),
      ageRange: data.get("ageRange"),
      time: data.get("time"),
      link: data.get("link"),
      type: data.get("type") || "film",
      shortDesc: data.get("shortDesc"),
      showTime: data.get("showTime"),
      category: data.get("category"),
      season: data.get("season"),
      longDesc: data.get("longDesc"),
      language: data.get("language"),
      contentType: data.get("contentType"),
      director: data.get("director"),
      priceStatus: data.get("priceStatus"),
      isSlider: data.get("isSlider"),
      mainImage: mainImageText,
      video: videoText,
      deskBanner: deskBannerText,
      mobileBanner: mobileBannerText,
      detailImage: detailImageList,
      creator: auth._id,
      isFree: false,
      logo: logoImageText,
      actors,
    });

    revalidatePath("/p-admin/movies");

    return {
      message: "اثر با موفقیت ایجاد شد",
      status: 201,
    };
  } catch (error) {
    return {
      message: "اتصال اینترنت خود را چک کنید",
      status: 500,
    };
  }
};
export const updateMovie = async (
  id: string,
  data: FormData,
  stars: TStar[],
) => {
  try {
    await connectToDB();

    if (!(await checkIsAdmin())) {
      return {
        message: "شما دسترسی برای ویرایش فیلم یا سریال ندارید",
        status: 403,
      };
    }

    const existingMovie = await MovieModel.findById(id);
    if (!existingMovie) {
      return {
        message: "اثر مورد نظر یافت نشد",
        status: 404,
      };
    }

    const mainImage = data.get("mainImage") as File | null;
    const logo = data.get("logo") as File | null;
    const video = data.get("video") as File | null;
    const deskBanner = data.get("deskBanner") as File | null;
    const mobileBanner = data.get("mobileBanner") as File | null;
    const detailImages = data.getAll("detailImage") as File[];
    
    const remainingDetailImagesRaw = data.get("remainingDetailImages") as string | null;
    const remainingDetailImages: string[] = remainingDetailImagesRaw
      ? JSON.parse(remainingDetailImagesRaw)
      : [];

    const actors = stars.map((star) => star.value);

    const uploadFile = async (
      file: File | null,
      oldPath: string,
      prefix: string,
    ): Promise<string> => {
      if (!file || !(file instanceof File)) return oldPath;

      if (oldPath) {
        const oldFilePath = path.join(process.cwd(), "public", oldPath);
        if (existsSync(oldFilePath)) {
          unlinkSync(oldFilePath);
        }
      }

      const fileName = `${prefix}_${Date.now()}_${file.name}`;
      const filePath = `/uploads/${fileName}`;
      const fullPath = path.join(process.cwd(), "public", filePath);
      
      const buffer = Buffer.from(await file.arrayBuffer());
      writeFileSync(fullPath, buffer  as any);

      return filePath;
    };

    let mainImageText = existingMovie.mainImage;
    let logoText = existingMovie.logo;
    let videoText = existingMovie.video;
    let deskBannerText = existingMovie.deskBanner;
    let mobileBannerText = existingMovie.mobileBanner;

    const existingDetailImages = existingMovie.detailImage || [];
    const detailImagesToDelete = existingDetailImages.filter(
      (path: string) => !remainingDetailImages.includes(path)
    );

    for (const imagePath of detailImagesToDelete) {
      const fullPath = path.join(process.cwd(), "public", imagePath);
      if (existsSync(fullPath)) {
        try {
          unlinkSync(fullPath);
        } catch (err) {
          console.error(`خطا در حذف فایل ${imagePath}:`, err);
        }
      }
    }

    if (mainImage) {
      mainImageText = await uploadFile(mainImage, mainImageText, "main");
    }
    if (logo) {
      logoText = await uploadFile(logo, logoText, "logo");
    }
    if (video) {
      videoText = await uploadFile(video, videoText, "video");
    }
    if (deskBanner) {
      deskBannerText = await uploadFile(deskBanner, deskBannerText, "desk");
    }
    if (mobileBanner) {
      mobileBannerText = await uploadFile(mobileBanner, mobileBannerText, "mobile");
    }

    let finalDetailImages = [...remainingDetailImages];

    if (detailImages.length > 0) {
      for (const image of detailImages) {
        if (image instanceof File) {
          const fileName = `detail_${Date.now()}_${image.name}`;
          const filePath = `/uploads/${fileName}`;
          const fullPath = path.join(process.cwd(), "public", filePath);
          const buffer = Buffer.from(await image.arrayBuffer());
          writeFileSync(fullPath, buffer as any);
          finalDetailImages.push(filePath);
        }
      }
    }

    await MovieModel.findByIdAndUpdate(
      id,
      {
        title: data.get("title"),
        ageRange: data.get("ageRange"),
        time: data.get("time"),
        link: data.get("link"),
        type: data.get("type") || "film",
        shortDesc: data.get("shortDesc"),
        showTime: data.get("showTime"),
        category: data.get("category"),
        season: data.get("season"),
        longDesc: data.get("longDesc"),
        language: data.get("language"),
        contentType: data.get("contentType"),
        director: data.get("director"),
        priceStatus: data.get("priceStatus"),
        isSlider: data.get("isSlider") === "true",
        mainImage: mainImageText,
        video: videoText,
        deskBanner: deskBannerText,
        mobileBanner: mobileBannerText,
        detailImage: finalDetailImages,
        logo: logoText,
        actors,
      },
      { new: true, runValidators: true },
    );

    revalidatePath("/p-admin/movies");
    revalidatePath("/");

    return {
      message: "اثر با موفقیت بروزرسانی شد",
      status: 200,
    };
  } catch (error) {
    console.error("خطا در بروزرسانی اثر:", error);
    return {
      message: "اتصال اینترنت خود را چک کنید",
      status: 500,
    };
  }
};
export const deleteMovie = async (id: string) => {
  try {
    await connectToDB();
    if (!(await checkIsAdmin())) {
      return {
        message: "شما دسترسی برای حذف فیلم یا سریال را ندارید",
        status: 403,
      };
    }
    if (!isValidObjectId(id)) {
      return {
        message: "لطفا ایدی معتبر ارسال کنید",
        status: 422,
      };
    }

    const movie = await MovieModel.findOne({ _id: id });

    if (!movie) {
      return {
        message: "این اثر یافت نشد",
        status: 404,
      };
    }

    deleteFiles([
      movie.mainImage,
      movie.desktopBanner,
      movie.mobileBanner,
      movie.logo,
      movie.video,
    ]);

    await CollectionModel.updateMany(
      { movies: { $in: [id] } },
      { $pull: { movies: id } },
    );

    await BookmarkModel.deleteMany({ movie: id });
    await WatchHistoryModel.deleteMany({ movie: id });

    if (movie.type === "series") {
      await SeasonModel.deleteMany({ series: id });
      await EpisodeModel.deleteMany({ series: id });
    }

    await MovieModel.findByIdAndDelete(`${id}`);

    revalidatePath("/p-admin/movies");

    return {
      message: "اثر مورد نظر با موفقیت حذف شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "لطفا اتصال اینترنت خود را بررسی کنید",
      status: 500,
    };
  }
};

export const likeMovie = async (
  movieId: string,
  userId: string,
  movieLink: string,
): Promise<TResponse> => {
  try {
    connectToDB();

    if (!userId) {
      return {
        message: "ابتدا لاگین کنید",
        status: 401,
      };
    }

    if (!isValidObjectId(movieId)) {
      return {
        message: "ایدی مورد نظر معتبر نمیباشد",
        status: 422,
      };
    }

    const isLiked = await MovieModel.findOne({
      _id: movieId,
      liked: { $in: userId },
    });

    const isDisLiked = await MovieModel.findOne({
      _id: movieId,
      disliked: { $in: userId },
    });

    let message = "";

    if (isLiked) {
      await MovieModel.findOneAndUpdate(
        { _id: movieId },
        {
          $pull: {
            liked: userId,
          },
        },
      );
      message = "از لایک ها حذف شد";
    } else if (isDisLiked) {
      await MovieModel.findOneAndUpdate(
        { _id: movieId },
        {
          $pull: {
            disliked: userId,
          },
          $push: {
            liked: userId,
          },
        },
      );
      message = "با موفقیت لایک شد";
    } else {
      await MovieModel.findOneAndUpdate(
        { _id: movieId },
        {
          $push: {
            liked: userId,
          },
        },
      );
      message = "با موفقیت لایک شد";
    }

    // revalidatePath(`/movie/${movieLink}`);
    // revalidatePath("/bookmarks");

    return {
      message,
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};
export const dislikeMovie = async (
  movieId: string,
  userId: string,
  movieLink: string,
): Promise<TResponse> => {
  try {
    connectToDB();

    if (!userId) {
      return {
        message: "ابتدا لاگین کنید",
        status: 401,
      };
    }

    if (!isValidObjectId(movieId)) {
      return {
        message: "ایدی مورد نظر معتبر نمیباشد",
        status: 422,
      };
    }

    const isLiked = await MovieModel.findOne({
      _id: movieId,
      liked: { $in: userId },
    });

    const isDisLiked = await MovieModel.findOne({
      _id: movieId,
      disliked: { $in: userId },
    });

    let message = "";

    if (isDisLiked) {
      await MovieModel.findOneAndUpdate(
        { _id: movieId },
        {
          $pull: {
            disliked: userId,
          },
        },
      );
      message = "از دیس لایک ها حذف شد";
    } else if (isLiked) {
      await MovieModel.findOneAndUpdate(
        { _id: movieId },
        {
          $pull: {
            liked: userId,
          },
          $push: {
            disliked: userId,
          },
        },
      );
      message = "با موفقیت دیس لایک شد";
    } else {
      await MovieModel.findOneAndUpdate(
        { _id: movieId },
        {
          $push: {
            disliked: userId,
          },
        },
      );
      message = "با موفقیت دیس لایک شد";
    }

    // revalidatePath(`/movie/${movieLink}`);
    // revalidatePath("/bookmarks");

    return {
      message,
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال خود را به اینترنت چک کنید",
      status: 500,
    };
  }
};

export const deleteUserLike = async (
  movieId: string,
  userId: string,
): Promise<TResponse> => {
  try {
    connectToDB();
    if (!isValidObjectId(movieId) || !isValidObjectId(userId)) {
      return {
        message: "ایدی مورد نظر معتبر نمیباشد",
        status: 422,
      };
    }

    await MovieModel.findOneAndUpdate(
      { _id: movieId },
      {
        $pull: {
          liked: userId,
        },
      },
    );

    revalidatePath("/p-user/favlist");

    return {
      message: "از لایک ها حذف شد",
      status: 200,
    };
  } catch (error) {
    return {
      message: "اتصال خود را چک کنید",
      status: 500,
    };
  }
};
