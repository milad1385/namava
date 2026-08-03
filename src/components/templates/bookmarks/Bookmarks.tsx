"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Movie from "@/src/components/modules/main/Movie/Movie";
import MovieSliderSkeleton from "@/src/components/modules/Skeleton/MovieSliderSkeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaHeart } from "react-icons/fa6";

function Bookmarks() {
  const [showStatus, setShowStatus] = useState("bookmark");
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [likesMovies, setLikesMovies] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [filteredLikes, setFilteredLikes] = useState([]);
  const pathname = usePathname();
  const isKid = pathname.includes("/kids");

  useEffect(() => {
    const getBookmarksAndLikes = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmarks`,
          {
            credentials: 'include',
            cache: 'no-store',
          }
        );
        const data = await res.json();
        
        const allBookmarks = data.bookmarks || [];
        const allLikes = data.likesMovie || [];
        
        setBookmarks(allBookmarks);
        setLikesMovies(allLikes);
        
        // فیلتر کردن بر اساس isKid
        if (isKid) {
          setFilteredBookmarks(
            allBookmarks.filter(
              (bookmark: any) => bookmark?.movie?.contentType === "kid"
            )
          );
          setFilteredLikes(
            allLikes.filter(
              (movie: any) => movie?.contentType === "kid"
            )
          );
        } else {
          setFilteredBookmarks(allBookmarks);
          setFilteredLikes(allLikes);
        }
        
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setBookmarks([]);
        setLikesMovies([]);
        setFilteredBookmarks([]);
        setFilteredLikes([]);
      } finally {
        setIsLoading(false);
      }
    };
    getBookmarksAndLikes();
  }, [isKid]);

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

      {isLoading ? (
        <div className="pt-10">
          <MovieSliderSkeleton isBookmark />
        </div>
      ) : (
        <>
          {showStatus === "bookmark" && (
            <>
              {filteredBookmarks?.length > 0 ? (
                <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-x-4 gap-y-16 pt-10">
                  {filteredBookmarks.map((bookmark: any) => (
                    <Movie
                      key={bookmark.movie._id}
                      title={bookmark.movie.title}
                      image={bookmark.movie.mainImage}
                      link={bookmark.movie.link}
                      type={bookmark.movie.type}
                      showTime={bookmark.movie.showTime}
                      contentType={isKid ? "kid" : "adult"}
                      language={bookmark.movie.language}
                      category={bookmark.movie.category.title}
                      isLink
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-milafilmBlack flex items-center justify-center flex-col py-8 mt-10 gap-y-12">
                  <FaBookmark className="text-[75px] md:text-[100px] lg:text-[125px]" />
                  <span className="text-sm md:text-xl">
                    {isKid 
                      ? "کاربر گرامی لیست بوک مارک های کودک شما خالی می باشد"
                      : "کاربر گرامی لیست بوک مارک های شما خالی می باشد"
                    }
                  </span>
                  <Link href={"/"}>
                    <Button className="!w-[250px]">بازگشت به خانه</Button>
                  </Link>
                </div>
              )}
            </>
          )}

          {showStatus === "wish" && (
            <>
              {filteredLikes?.length > 0 ? (
                <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-x-4 gap-y-16 pt-10">
                  {filteredLikes.map((movie: any) => (
                    <Movie
                      key={movie._id}
                      title={movie.title}
                      image={movie.mainImage}
                      link={movie.link}
                      type={movie.type}
                      showTime={movie.showTime}
                      contentType={isKid ? "kid" : "adult"}
                      language={movie.language}
                      category={movie.category.title}
                      isLink
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-milafilmBlack flex items-center justify-center flex-col py-8 mt-10 gap-y-12">
                  <FaHeart className="text-[75px] md:text-[100px] lg:text-[125px]" />
                  <span className="text-sm md:text-xl">
                    {isKid
                      ? "کاربر گرامی لیست علاقه مندی های کودک شما خالی می باشد"
                      : "کاربر گرامی لیست علاقه مندی های شما خالی می باشد"
                    }
                  </span>
                  <Link href={"/"}>
                    <Button className="!w-[250px]">بازگشت به خانه</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Bookmarks;