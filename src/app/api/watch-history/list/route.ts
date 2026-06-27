import connectToDB from "@/src/configs/db";
import WatchHistoryModel from "@/src/models/watchHistory";
import { authUser } from "@/src/utils/serverHelper";
import { NextResponse } from "next/server";
import MovieModel from "@/src/models/movie"
import CategoryModel from "@/src/models/category"

interface WatchHistoryResponse {
  success: boolean;
  data: any[];
  total: number;
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const user = await authUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    const history = await WatchHistoryModel.find({ user: user._id })
      .populate({
        path: "movie",
        select: "title link deskBanner mobileBanner type category showTime",
        populate: {
          path: "category",
          select: "title",
        },
      })
      .sort({ lastWatched: -1 })
      .limit(limit)
      .lean();

    const filteredHistory = history.filter((item) => item.movie);

    return NextResponse.json<WatchHistoryResponse>({
      success: true,
      data: filteredHistory,
      total: filteredHistory.length,
    });
  } catch (error) {
    console.error("Error getting watch history:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
