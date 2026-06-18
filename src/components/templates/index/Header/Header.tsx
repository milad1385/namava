"use client";
import { THeader } from "@/src/libs/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HeaderDetail from "./HeaderDetail";
import { useEffect, useState } from "react";

function Header({
  isImage,
  isTitle,
  isKid,
  img,
  mobileImage,
  className,
  info,
  onSwipe,
  subscription,
  bookmarks,
  user,
}: THeader) {
  const [episodeId, setEpisodeId] = useState("");
  const pathname = usePathname();
  const isAboutPage = pathname.includes("/about");

  useEffect(() => {
    const getSeriesEpisode = async () => {
      if (info?.type !== "series") return false;
      const res = await fetch(`/api/episode/${info._id}`);
      const episode = await res.json();
      setEpisodeId(episode._id);
    };

    getSeriesEpisode();
  }, [info]);

  return (
    <>
      <header
        className={`${className} header-video  ${
          isKid || (isAboutPage && !className)
            ? "min-h-screen md:min-h-screen"
            : "min-h-[80vh] md:min-h-[100vh]"
        }`}
      >
        {isImage ? (
          <>
            <Image
              className={`w-full title-image hidden lg:block ${
                isKid ? "mt-20 min-h-screen" : ""
              }`}
              src={`${img}`}
              alt="havieee.jpg"
              width={1920}
              height={1080}
            />
            <Image
              className="w-full title-image block lg:hidden"
              src={`${info?.mobileBanner ?? `/images/${mobileImage}`}`}
              alt="havieee.jpg"
              width={1920}
              height={1080}
            />
          </>
        ) : (
          <video className="video-player " autoPlay muted loop>
            <source src="/images/okazion.mp4" />
          </video>
        )}
        {!isAboutPage && (
          <HeaderDetail
            user={user}
            subscription={subscription}
            isKid={isKid}
            info={info}
            bookmarks={bookmarks}
            episodeId={episodeId}
          />
        )}
        {!isTitle && (
          <div className="absolute left-10 bottom-14 hidden md:flex items-center gap-x-3 z-20">
            <button
              onClick={() => onSwipe?.slidePrev()}
              className="flex-center py-3 px-3  bg-gray-500/35  rounded-full text-[13px]"
            >
              <FaChevronRight className="text-[16px] text-gray-400" />
            </button>
            <button className="flex-center py-3 px-3  bg-gray-500/35  rounded-full text-[13px]">
              <FaChevronLeft
                onClick={() => onSwipe?.slideNext()}
                className="text-[16px] text-gray-400"
              />
            </button>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
