// "use client";
// import { IVideoPlayer } from "@/src/libs/types";
// import { useEffect, useRef } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";

// const VideoPlayer = ({ src, poster, subtitles }: IVideoPlayer) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     if (!videoRef.current) return;

//     const tracks =
//       subtitles?.map((sub) => ({
//         kind: "subtitles",
//         src: sub.url,
//         srclang: sub.lang,
//         label: sub.label,
//         default: sub.default || false,
//       })) || [];

//     const player = videojs(videoRef.current, {
//       controls: true,
//       autoplay: false,
//       preload: "auto",
//       poster: poster || "",
//       fluid: true,
//       aspectRatio: "16:9",
//       tracks: tracks,
//       controlBar: {
//         volumePanel: { inline: false },
//         pictureInPictureToggle: true,
//         fullscreenToggle: true,
//       },
//     });

//     player.src({ src, type: "video/mp4" });
//     playerRef.current = player;

//     //  وقتی ویدیو لود شد، از ثانیه ۱۰ شروع کن
//     player.on("loadedmetadata", () => {
//       player.currentTime(10);
//     });
//   }, [src, poster, subtitles]);

//   return (
//     <div className="rounded-xl overflow-hidden bg-black shadow-2xl">
//       <div data-vjs-player>
//         <video
//           ref={videoRef}
//           className="video-js vjs-big-play-centered vjs-16-9 w-full"
//           style={{ display: "block" }}
//           playsInline
//         />
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
"use client";
import { IVideoPlayer } from "@/src/libs/types";
import { useEffect, useRef, useState, useCallback } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps extends IVideoPlayer {
  movieId: string;
  episodeId?: string;
}

const VideoPlayer = ({
  src,
  poster,
  subtitles,
  movieId,
  episodeId,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialized = useRef(false);
  const [savedTime, setSavedTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const lastSavedTimeRef = useRef<number>(0);
  const isSavingRef = useRef<boolean>(false);
  const isUnmountingRef = useRef<boolean>(false);

  //  دریافت موقعیت ذخیره شده از سرور
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `/api/watch-history?movieId=${movieId}&episodeId=${episodeId || ""}`,
        );
        const data = await res.json();
        console.log("📊 History data:", data);

        if (data && data.currentTime > 5) {
          setSavedTime(data.currentTime);
          lastSavedTimeRef.current = data.currentTime;
          console.log("⏱️ Saved time loaded:", data.currentTime);
        } else {
          console.log("⏱️ No saved time found, starting from beginning");
          setSavedTime(0);
          lastSavedTimeRef.current = 0;
        }
      } catch (error) {
        console.error("Error loading history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [movieId, episodeId]);

  //  تابع ذخیره موقعیت در سرور
  const saveProgress = useCallback(
    async (currentTime: number, duration: number) => {
      // جلوگیری از ذخیره‌سازی تکراری
      if (isSavingRef.current) return;
      if (Math.abs(currentTime - lastSavedTimeRef.current) < 2) return; // کمتر از 2 ثانیه اختلاف

      isSavingRef.current = true;
      const progress =
        duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
      const isCompleted = progress >= 95;

      try {
        const response = await fetch("/api/watch-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            movieId,
            episodeId: episodeId || null,
            currentTime: isCompleted ? duration : currentTime,
            duration,
            progress,
            isCompleted,
          }),
        });

        if (response.ok) {
          lastSavedTimeRef.current = currentTime;
          console.log("💾 Progress saved:", Math.floor(currentTime), "s");
        }
      } catch (error) {
        console.error("Error saving progress:", error);
      } finally {
        isSavingRef.current = false;
      }
    },
    [movieId, episodeId],
  );

  //  ساخت Video.js player
  useEffect(() => {
    if (!videoRef.current) return;
    if (isInitialized.current) return;
    if (isLoading) return;
    isInitialized.current = true;

    console.log("🎬 Building Video.js player...");
    console.log(" Saved time:", savedTime);

    const tracks =
      subtitles?.map((sub) => ({
        kind: "subtitles",
        src: sub.url,
        srclang: sub.lang,
        label: sub.label,
        default: sub.default || false,
      })) || [];

    const timeoutId = setTimeout(() => {
      const player = videojs(videoRef.current!, {
        controls: true,
        autoplay: false,
        preload: "auto",
        poster: poster || "",
        fluid: true,
        aspectRatio: "16:9",
        tracks: tracks,
        controlBar: {
          volumePanel: { inline: false },
          pictureInPictureToggle: true,
          fullscreenToggle: true,
        },
      });

      player.src({ src, type: "video/mp4" });
      playerRef.current = player;

      //  وقتی ویدیو لود شد، از ثانیه ذخیره شده شروع کن
      player.on("loadedmetadata", () => {
        if (savedTime > 5) {
          player.currentTime(savedTime);
          console.log("⏱️ Starting from saved time:", savedTime);
        } else {
          console.log("⏱️ Starting from beginning");
        }
      });

      //  ذخیره موقعیت هر ۵ ثانیه
      const handleTimeUpdate = () => {
        if (saveIntervalRef.current) {
          clearInterval(saveIntervalRef.current);
        }

        saveIntervalRef.current = setInterval(() => {
          const currentTime = player.currentTime();
          const duration = player.duration();
          if (duration > 0 && currentTime > 0) {
            saveProgress(currentTime, duration);
          }
        }, 5000);
      };

      player.on("timeupdate", handleTimeUpdate);

      //  ذخیره موقعیت هنگام بسته شدن صفحه (beforeunload)
      const handleBeforeUnload = () => {
        const currentTime = player.currentTime();
        const duration = player.duration();
        if (duration > 0) {
          // استفاده از sendBeacon برای اطمینان از ارسال
          const progress =
            duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
          const isCompleted = progress >= 95;

          const data = JSON.stringify({
            movieId,
            episodeId: episodeId || null,
            currentTime: isCompleted ? duration : currentTime,
            duration,
            progress,
            isCompleted,
          });

          navigator.sendBeacon("/api/watch-history", data);
          console.log("📤 Sent via sendBeacon:", Math.floor(currentTime), "s");
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      //  ذخیره موقعیت هنگام بسته شدن صفحه با pagehide (برای موبایل)
      const handlePageHide = () => {
        const currentTime = player.currentTime();
        const duration = player.duration();
        if (duration > 0) {
          const progress =
            duration > 0 ? Math.round((currentTime / duration) * 100) : 0;
          const isCompleted = progress >= 95;

          const data = JSON.stringify({
            movieId,
            episodeId: episodeId || null,
            currentTime: isCompleted ? duration : currentTime,
            duration,
            progress,
            isCompleted,
          });

          navigator.sendBeacon("/api/watch-history", data);
          console.log("📤 Sent via pagehide:", Math.floor(currentTime), "s");
        }
      };
      window.addEventListener("pagehide", handlePageHide);

      //  ذخیره موقعیت هنگام pause
      const handlePause = () => {
        const currentTime = player.currentTime();
        const duration = player.duration();
        if (duration > 0 && currentTime > 0) {
          saveProgress(currentTime, duration);
        }
      };
      player.on("pause", handlePause);

      //  ذخیره موقعیت هنگام seeked (وقتی کاربر روی تایم‌لاین کلیک میکنه)
      const handleSeeked = () => {
        const currentTime = player.currentTime();
        const duration = player.duration();
        if (duration > 0 && currentTime > 0) {
          saveProgress(currentTime, duration);
        }
      };
      player.on("seeked", handleSeeked);

      const backupInterval = setInterval(() => {
        const currentTime = player?.currentTime?.();
        const duration = player.duration();
        if (duration > 0 && currentTime > 0) {
          saveProgress(currentTime, duration);
        }
      }, 10000);

      console.log("✅ Player created successfully!");

      return () => {
        clearInterval(backupInterval);
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
      window.removeEventListener("beforeunload", () => {});
      window.removeEventListener("pagehide", () => {});
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      isInitialized.current = false;
    };
  }, [
    src,
    poster,
    subtitles,
    movieId,
    episodeId,
    savedTime,
    isLoading,
    saveProgress,
  ]);

  //  اگر در حال بارگذاری تاریخچه هستیم، لودر نشان بده
  if (isLoading) {
    return (
      <div className="rounded-xl overflow-hidden bg-black/50 shadow-2xl flex items-center justify-center h-[192px] md:h-[600px]">
        <p className="text-gray-400 text-sm md:text-base">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl">
      <div data-vjs-player>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered vjs-16-9 w-full"
          style={{ display: "block" }}
          playsInline
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
