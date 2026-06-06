"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Movie from "@/src/components/modules/main/Movie/Movie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaBookmark, FaHeart } from "react-icons/fa6";

function Bookmarks({ bookmarks, likesMovies }: any) {
  const [showStatus, setShowStatus] = useState("bookmark");
  const pathname = usePathname();
  return (
    <>
      {/* bookmark header */}
      <div className="flex items-center gap-x-6">
        <div
          className={`text-sm md:text-lg bookmarkItem ${
            showStatus === "bookmark"
              ? `${
                  pathname.includes("kids")
                    ? "!bg-black !text-white"
                    : "bookmark--active"
                }`
              : ""
          } ${pathname.includes("kids") ? "text-black" : ""}`}
          onClick={() => setShowStatus("bookmark")}
        >
          نشان شده ها
        </div>
        <div
          className={`text-sm md:text-lg bookmarkItem ${
            showStatus === "wish"
              ? `${
                  pathname.includes("kids")
                    ? "!bg-black !text-white"
                    : "bookmark--active"
                }`
              : ""
          } ${pathname.includes("kids") ? "text-black" : ""}`}
          onClick={() => setShowStatus("wish")}
        >
          علاقه مندی ها
        </div>
      </div>

      {/* bookmark body */}

      {showStatus === "bookmark" &&
        (bookmarks?.length > 0 ? (
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-x-4 gap-y-16 pt-10">
            {bookmarks.map((bookmark: any) => (
              <Movie
                key={bookmark.movie._id}
                title={bookmark.movie.title}
                image={bookmark.movie.mainImage}
                link={bookmark.movie.link}
                type={bookmark.movie.type}
                showTime={bookmark.movie.showTime}
                isLink
              />
            ))}
          </div>
        ) : (
          <div className="bg-namavaBlack flex items-center justify-center flex-col py-8 mt-10 gap-y-12">
            <FaBookmark className="text-[75px] md:text-[100px] lg:text-[125px]" />
            <span className="text-sm md:text-xl">
              کاربر گرامی لیست بوک مارک های شما خالی می باشد
            </span>

            <Link href={"/"}>
              <Button className="!w-[250px]">بازگشت به خانه</Button>
            </Link>
          </div>
        ))}

      {showStatus === "wish" &&
        (likesMovies?.length > 0 ? (
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-x-4 gap-y-16 pt-10">
            {likesMovies.map((movie: any) => (
              <Movie
                key={movie._id}
                title={movie.title}
                image={movie.mainImage}
                link={movie.link}
                type={movie.type}
                showTime={movie.showTime}
                isLink
              />
            ))}
          </div>
        ) : (
          <div className="bg-namavaBlack flex items-center justify-center flex-col py-8 mt-10 gap-y-12">
            <FaHeart className="text-[75px] md:text-[100px] lg:text-[125px]" />
            <span className="text-sm md:text-xl">
              کاربر گرامی لیست علاقه مندی های شما خالی می باشد
            </span>

            <Link href={"/"}>
              <Button className="!w-[250px]">بازگشت به خانه</Button>
            </Link>
          </div>
        ))}
    </>
  );
}

export default Bookmarks;
