"use client";
import React from "react";
import VideoPlayer from "./VideoPlayer";
import { subtitleList } from "@/public/db";
import Button from "../../auth/Button/Button";
import { useRouter } from "next/navigation";

function VideoContent() {
  const router = useRouter();
  return (
    <div className="w-[75%] mx-auto py-4 text-white">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-base md:text-xl font-IranMedium">
          کاربر گرامی میتوانید به تماشای آنلاین بپردازید
        </h3>
        <Button className="!w-[125px]" onClick={() => router.back()}>
          بازگشت
        </Button>
      </div>
      <VideoPlayer
        src="/videos/testVideo.mp4"
        poster="/images/films/testPoster.jpg"
        subtitles={subtitleList}
      />
      <div className="flex items-center justify-between mt-8">
        <h1 className="text-base md:text-xl font-IranMedium">
          مرد عنکبوتی ، راهی به خانه نیست
        </h1>
        <div className="flex gap-x-3 font-Dana">
          <span>مدت : 118 دقیقه</span>
          <span>سال ساخت : 2021</span>
        </div>
      </div>
    </div>
  );
}

export default VideoContent;
