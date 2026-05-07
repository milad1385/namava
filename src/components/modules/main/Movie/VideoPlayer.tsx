"use client";
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ src, poster, subtitles }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const tracks = subtitles?.map(sub => ({
      kind: "subtitles",
      src: sub.url,
      srclang: sub.lang,
      label: sub.label,
      default: sub.default || false
    })) || [];

    

    const player = videojs(videoRef.current, {
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

  }, [src, poster, subtitles]);

  return (
    <div className="rounded-xl overflow-hidden bg-black shadow-2xl">
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