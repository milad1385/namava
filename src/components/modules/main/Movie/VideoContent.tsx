"use client";
import React from "react";
import VideoPlayer from "./VideoPlayer";
import { subtitleList } from "@/public/db";
import Button from "../../auth/Button/Button";
import { usePathname, useRouter } from "next/navigation";

function VideoContent() {
  const router = useRouter();
  const pathname = usePathname();

  const isKid = pathname.includes("/kids");
  return (
    <div
      className={`w-[95%] md:w-[75%] mx-auto md:py-4 ${isKid ? "text-black" : "text-white"}`}
    >
      <div className="flex items-center justify-between gap-x-2 mb-8">
        <h3 className="text-[13px] md:text-xl font-IranMedium">
          کاربر گرامی میتوانید به تماشای آنلاین بپردازید
        </h3>
        <Button
          className="text-xs !w-[60px]  md:!w-[125px] !text-white"
          onClick={() => router.back()}
        >
          بازگشت
        </Button>
      </div>
      <VideoPlayer
        src="/videos/testVideo.mp4"
        poster="/images/films/testPoster.jpg"
        subtitles={subtitleList}
      />
      <div className="flex flex-col md:flex-row items-start gap-y-4 md:items-center justify-between mt-8">
        <h1 className="text-base md:text-xl font-IranMedium">
          مرد عنکبوتی ، راهی به خانه نیست
        </h1>
        <div className="flex gap-x-3 font-Dana text-sm md:text-base">
          <span>مدت : 118 دقیقه</span>
          <span>سال ساخت : 2021</span>
        </div>
      </div>
    </div>
  );
}

export default VideoContent;
