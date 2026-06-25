"use client";
import Heart from "@/src/icons/Heart";
import { IMovie } from "@/src/libs/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function Movie({
  image,
  title,
  contentType,
  link,
  isLink,
  type,
  showTime,
  category,
}: IMovie) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isKid = pathname.includes("/kids");
  const bgColor = isKid ? "bg-gray-300" : "bg-gray-700"

  const getHref = () => {
    if (type === "film") {
      return !isLink
        ? `/movie/${link}`
        : `${contentType === "adult" ? "" : "/kids"}/movie/${link}`;
    } else {
      return !isLink
        ? `/series/${link}`
        : `${contentType === "adult" ? "" : "/kids"}/series/${link}`;
    }
  };

  const handleMovieNavigation = () => {
    if (isLink) {
      router.push(getHref());
    }
  };

  const Wrapper = ({ children }) => {
    if (isLink) {
      return (
        <Link
          href={getHref()}
          className="transition-all hidden lg:block group cursor-pointer"
        >
          {children}
        </Link>
      );
    } else {
      return (
        <div
          onClick={handleMovieNavigation}
          className="transition-all hidden lg:block group cursor-pointer"
        >
          {children}
        </div>
      );
    }
  };

  return (
    <>
      <Wrapper>
        <div className="relative">
          {!isImageLoaded && (
            <div
              className={`absolute inset-0 ${bgColor} rounded-md overflow-hidden`}
            >
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          )}
          <Image
            src={image}
            alt={title}
            width={1920}
            height={1080}
            onLoad={() => setIsImageLoaded(true)}
            className={`rounded-md shadow w-full lg:w-full lg:h-[280px] object-cover md:w-auto h-[160px] md:h-auto transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            } ${pathname.includes("/kids/collections") ? "lg:h-[401px]" : ""}`}
          />
          <div className="flex !text-white text-xs md:text-sm transition-all group-hover:opacity-100 group-hover:visible duration-100 opacity-0 invisible justify-end flex-col absolute inset-0 movie-overlay rounded-md">
            <div className="pb-6 px-2 space-y-2 md:space-y-3">
              <p className="text-xs md:text-[13px] !text-white">
                <span className="font-Dana text-white">
                  {type === "film" ? "فیلم" : "سریال"} -{" "}
                </span>
                <span className="font-Dana text-white">{category} - </span>
                <span className="font-Dana text-white">{showTime}</span>
              </p>
              <div className="flex text-xs md:text-[13px] gap-x-1">
                <Heart className="!text-white" />
                <span className="font-Dana mt-[1px] !text-white">%80</span>
              </div>
            </div>
          </div>
        </div>
        <h3
          className={`text-xs mt-3 mr-3 ${
            pathname.includes("kids") ? "text-black !text-base" : "text-white"
          }`}
        >
          {title}
        </h3>
      </Wrapper>

      <Link
        href={getHref()}
        className="transition-all block lg:hidden group cursor-pointer"
      >
        <div className="relative">
          {!isImageLoaded && (
            <div className={`absolute inset-0 ${bgColor} rounded-md overflow-hidden`}>
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          )}
          <Image
            src={image}
            alt={title}
            width={490}
            height={500}
            onLoad={() => setIsImageLoaded(true)}
            className={`rounded-md w-full lg:w-full lg:h-[270px] object-cover md:w-auto h-[170px] md:h-auto transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="flex text-xs md:text-sm transition-all group-hover:opacity-100 group-hover:visible duration-100 opacity-0 invisible justify-end flex-col absolute inset-0 movie-overlay rounded-md">
            <div className="pb-6 px-2 space-y-2 md:space-y-3">
              <p className="text-xs md:text-[13px] text-white">
                <span className="font-Dana text-white">
                  {type === "film" ? "فیلم" : "سریال"} -{" "}
                </span>
                <span className="font-Dana text-white">{showTime}</span>
              </p>
              <div className="flex gap-x-1">
                <Heart className="!text-white" />
                <span className="font-Dana mt-[1px] text-white">%80</span>
              </div>
            </div>
          </div>
        </div>
        <h3
          className={`text-xs mt-3 mr-3 line-clamp-1 ${
            pathname.includes("kids") ? "text-black" : "text-white"
          }`}
        >
          {title}
        </h3>
      </Link>
    </>
  );
}

export default Movie;
