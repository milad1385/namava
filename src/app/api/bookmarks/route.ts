import connectToDB from "@/src/configs/db";
import BookmarkModel from "@/src/models/bookmark";
import MovieModel from "@/src/models/movie";
import { authUser } from "@/src/utils/serverHelper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const user = await authUser();
    const bookmarks = await BookmarkModel.find({ user: user._id })
      .populate({
        path: "movie",
        select:
          "link title mainImage type showTime contentType category language",
        populate: {
          path: "category",
          select: "title",
        },
      })
      .sort({ createdAt: -1 });

    const likesMovie = await MovieModel.find({
      liked: { $in: user._id },
    })
      .populate("category", "title")
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookmarks, likesMovie });
  } catch (error) {
    return NextResponse.json(
      { message: "مشکلی پیش آمده است" },
      { status: 500 },
    );
  }
}
