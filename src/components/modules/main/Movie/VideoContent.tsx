// "use client";
// import React from "react";
// import VideoPlayer from "./VideoPlayer";
// import { subtitleList } from "@/public/db";
// import Button from "../../auth/Button/Button";
// import { usePathname, useRouter } from "next/navigation";

// function VideoContent({ movie, episode }: { movie: any; episode?: any }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const isKid = pathname.includes("/kids");

//   return (
//     <div
//       className={`w-[95%] md:w-[75%] mx-auto md:py-4 ${isKid ? "text-black" : "text-white"}`}
//     >
//       <div className="flex items-center justify-between gap-x-2 mb-8">
//         <h3 className="text-[13px] md:text-xl font-IranMedium">
//           کاربر گرامی میتوانید به تماشای آنلاین بپردازید
//         </h3>
//         <Button
//           className="text-xs !w-[60px]  md:!w-[125px] !text-white"
//           onClick={() => router.back()}
//         >
//           بازگشت
//         </Button>
//       </div>
//       <VideoPlayer
//         src="/videos/testVideo.mp4"
//         poster={movie.deskBanner}
//         subtitles={subtitleList}
//       />
//       <div className="flex flex-col md:flex-row items-start gap-y-4 md:items-center justify-between mt-8">
//         <h1 className="text-base md:text-xl font-IranMedium">
//           {!episode ? movie.title : episode.title}
//         </h1>
//         <div className="flex gap-x-3 font-Dana text-sm md:text-base">
//           <span>مدت : {!episode ? movie.time : episode.time} دقیقه</span>
//           <span>سال ساخت : {movie.showTime}</span>
//         </div>
//       </div>
//       <p
//         className={`${isKid ? "text-zinc-700" : "text-gray-300"} text-sm/[28px] text-justify md:text-base/[35px] mt-10 `}
//       >
//         {!episode ? movie.longDesc : episode.description}
//       </p>
//     </div>
//   );
// }

// export default VideoContent;

"use client";
import React from "react";
import VideoPlayer from "./VideoPlayer";
import Button from "../../auth/Button/Button";
import { usePathname, useRouter } from "next/navigation";
import { subtitleList } from "@/public/db";

interface VideoContentProps {
  movie: any;
  episode?: any;
}

function VideoContent({
  movie,
  episode,
}: VideoContentProps): React.ReactElement {
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
          className="text-xs !w-[60px] md:!w-[125px] !text-white"
          onClick={() => router.back()}
        >
          بازگشت
        </Button>
      </div>

      <VideoPlayer
        src="/videos/testVideo.mp4"
        poster={movie.deskBanner}
        movieId={movie._id}
        subtitles={subtitleList}
        episodeId={movie._id}
      />

      <div className="flex flex-col md:flex-row items-start gap-y-4 md:items-center justify-between mt-8">
        <h1 className="text-base md:text-xl font-IranMedium">
          {!episode ? movie.title : episode.title}
        </h1>
        <div className="flex gap-x-3 font-Dana text-sm md:text-base">
          <span>مدت : {!episode ? movie.time : episode.time} دقیقه</span>
          <span>سال ساخت : {movie.showTime}</span>
        </div>
      </div>

      <p
        className={`${isKid ? "text-zinc-700" : "text-gray-300"} text-sm/[28px] text-justify md:text-base/[35px] mt-10`}
      >
        {!episode ? movie.longDesc : episode.description}
      </p>
    </div>
  );
}

export default VideoContent;
