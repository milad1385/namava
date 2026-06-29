import { getWatchHistoryFresh } from "@/src/libs/actions/watchHistory";
import WatchHistoryList from "./WatchHistoryList";

async function WatchListSection({ categoryId }: { categoryId: string }) {
  const historyData = await getWatchHistoryFresh();
  let history = historyData?.data || [];
  if (categoryId) {
    history = history?.filter(
      (movieData) =>
        String(movieData?.movie?.category.parrent) === String(categoryId),
    );
  }

  return (
    <div>
      <WatchHistoryList history={JSON.parse(JSON.stringify(history))} />
    </div>
  );
}

export default WatchListSection;
