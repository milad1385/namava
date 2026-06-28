// components/modules/main/WatchHistory/WatchHistoryItem.tsx
"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface WatchHistoryItemProps {
  item: any;
}

function WatchHistoryItem({ item }: WatchHistoryItemProps): React.ReactElement {
  console.log(item);
  
  const router = useRouter();
  const movie = item.movie;
  const progress = item.progress || 0;
  const isCompleted = item.isCompleted || progress >= 95;

  const basePath = movie.type === "film" ? "movie" : "series";
  const handleClick = useCallback(() => {
    const link = `/${basePath}/${movie.link}/session/${basePath === "series" ? item?.episode?._id : ""}`;
    router.push(isCompleted ? `${link}?start=0` : link);
  }, [movie, isCompleted, router]);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + ":" : ""}${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer transition-transform"
    >
      <div className="relative rounded-lg overflow-hidden bg-milafilmBlack">
        <div className="relative aspect-[3/2]">
          <Image
            src={basePath === "movie" ? movie.deskBanner || movie.mobileBanner : item?.episode?.image}
            alt={movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
          {!isCompleted && progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {isCompleted && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-green-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                ✓ تماشا شده
              </span>
            </div>
          )}

          <div className="absolute top-2 left-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white">
            {movie.type === "film" ? "🎬 فیلم" : "📺 سریال"}
          </div>

          {!isCompleted && progress > 0 && (
            <div className="absolute font-Dana top-2 right-2 bg-blue-500/90 px-2 py-0.5 rounded text-xs text-white">
              {progress}%
            </div>
          )}

          {!isCompleted && item?.currentTime > 0 && (
            <div className="absolute bottom-6 left-2 font-Dana bg-black/70 px-2 py-0.5 rounded text-xs text-white">
              ⏱️ {formatTime(item?.currentTime)}
            </div>
          )}
        </div>

        {/* اطلاعات فیلم */}
        <div className="p-2 my-2 space-y-2">
          <h3 className="text-xs md:text-sm font-medium text-white line-clamp-1">
            {basePath === "movie" ? movie.title : item?.episode?.title}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-400">
              {movie.category?.title || "بدون دسته"}
            </span>
            {isCompleted ? (
              <span className="text-xs text-green-400">تماشا شده</span>
            ) : (
              <span className="text-xs text-gray-500">
                {new Date(item.lastWatched).toLocaleDateString("fa-IR")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchHistoryItem;
