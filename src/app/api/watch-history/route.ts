import connectToDB from "@/src/configs/db";
import WatchHistoryModel from "@/src/models/watchHistory";
import { authUser } from "@/src/utils/serverHelper";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface WatchHistoryBody {
  movieId: string;
  episodeId?: string | null;
  currentTime: number;
  duration: number;
  progress: number;
  isCompleted: boolean;
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const user = await authUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("movieId");
    const episodeId = searchParams.get("episodeId");

    if (!movieId) {
      return NextResponse.json(
        { error: "movieId is required" },
        { status: 400 },
      );
    }

    const query: any = {
      user: user._id,
      movie: new Types.ObjectId(movieId),
    };

    if (episodeId) {
      query.episode = new Types.ObjectId(episodeId);
    }

    const history = await WatchHistoryModel.findOne(query).lean();

    const response = NextResponse.json(
      history?.isCompleted
        ? { ...history, currentTime: 0, isCompleted: true }
        : history || null,
    );

    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Error getting watch history:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    await connectToDB();
    const user = await authUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: WatchHistoryBody = await req.json();

    const { movieId, episodeId, currentTime, duration, progress, isCompleted } =
      body;

    if (!movieId) {
      return NextResponse.json(
        { error: "movieId is required" },
        { status: 400 },
      );
    }

    const finalCurrentTime = isCompleted ? duration : currentTime;

    const history = await WatchHistoryModel.findOneAndUpdate(
      {
        user: user._id,
        movie: new Types.ObjectId(movieId),
        episode: episodeId ? new Types.ObjectId(episodeId) : null,
      },
      {
        $set: {
          currentTime: finalCurrentTime,
          duration,
          progress,
          isCompleted,
          lastWatched: new Date(),
        },
      },
      {
        upsert: true,
        new: true,
      },
    );

    const response = NextResponse.json({ success: true, history });
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Error saving watch history:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
