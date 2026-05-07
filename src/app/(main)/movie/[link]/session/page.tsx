import { subtitleList } from "@/public/db";
import VideoPlayer from "@/src/components/modules/main/Movie/VideoPlayer";
import React from "react";

function page() {
  
  return (
    <div className="my-28 container px-2">
      <div className="w-[75%] mx-auto py-12">
        <VideoPlayer
          src="/videos/testVideo.mp4"
          poster="/images/films/testPoster.jpg"
          subtitles={subtitleList}
        />
      </div>
    </div>
  );
}

export default page;
