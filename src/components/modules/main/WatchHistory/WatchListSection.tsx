import { getWatchHistoryFresh } from "@/src/libs/actions/watchHistory";
import WatchHistoryList from "./WatchHistoryList";

async function WatchListSection({
  type,
  categoryId,
}: {
  type?: string;
  categoryId: string;
}) {
  const historyData = await getWatchHistoryFresh();
  let history = historyData?.data || [];
  if (categoryId) {
    history = history?.filter(
      (movieData) =>
        String(movieData?.movie?.category.parrent) === String(categoryId),
    );
  }

  if (type !== "all") {
    history = history.filter((movieData) => movieData.movie.type === type);
  }

  return (
    <div>
      <WatchHistoryList history={JSON.parse(JSON.stringify(history))} />
    </div>
  );
}

export default WatchListSection;
