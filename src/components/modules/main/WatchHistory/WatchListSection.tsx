import React from "react";
import WatchHistoryList from "./WatchHistoryList";
import { getWatchHistory } from "@/src/libs/service/services";

async function WatchListSection() {
  const history = await getWatchHistory();
  console.log(history);
  
  return (
    <div>
      <WatchHistoryList history={JSON.parse(JSON.stringify(history))} />
    </div>
  );
}

export default WatchListSection;
