import { getWatchHistoryFresh } from "@/src/libs/actions/watchHistory";
import WatchHistoryList from "./WatchHistoryList";

async function WatchListSection() {
  const historyData = await getWatchHistoryFresh();
  const history = historyData?.data || [];

  return (
    <div>
      <WatchHistoryList history={JSON.parse(JSON.stringify(history))} />
    </div>
  );
}

export default WatchListSection;
