import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/src/configs/db";
import BookmarkModel from "@/src/models/bookmark";
import { authUser } from "@/src/utils/serverHelper";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const searchParams = req.nextUrl.searchParams;
    const movieId = searchParams.get("movieId");

    if (!movieId) {
      return NextResponse.json(
        { error: "movieId الزامی است", success: false },
        { status: 400 }
      );
    }

    const user = await authUser();

    if (!user) {
      return NextResponse.json(
        { error: "لطفاً وارد شوید", success: false },
        { status: 401 }
      );
    }

    // فقط بررسی کن که این فیلم برای این کاربر بوکمارک شده یا نه
    const bookmark = await BookmarkModel.findOne({
      user: user._id,
      movie: movieId,
    });

    return NextResponse.json(
      {
        isBookmarked: !!bookmark,
        success: true,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Error checking bookmark:", error);
    return NextResponse.json(
      { error: "خطا در بررسی بوکمارک", success: false },
      { status: 500 }
    );
  }
}