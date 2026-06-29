import connectToDB from "@/src/configs/db";
import WatchHistoryModel from "@/src/models/watchHistory";
import { authUser } from "@/src/utils/serverHelper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function getWatchHistoryFresh() {
  await connectToDB();
  const user = await authUser();

  if (!user) return { data: [], timestamp: Date.now() };

  const history = await WatchHistoryModel.find({ user: user._id })
    .populate({
      path: "movie",
      select: "title link deskBanner mobileBanner type category showTime _id",
      populate: { path: "category", select: "title parrent" },
    })
    .populate("episode", "_id title image")
    .sort({ lastWatched: -1 })
    .limit(20)
    .lean();

  const result = history
    .filter((item) => item.movie)
    .map((item) => {
      const movie = item.movie;
      const cleanLink = movie.link.includes("/")
        ? movie.link.split("/")[0]
        : movie.link;

      return {
        ...item,
        movie: {
          ...movie,
          link: cleanLink,
        },
      };
    });

  return {
    data: result,
    timestamp: Date.now(),
  };
}
