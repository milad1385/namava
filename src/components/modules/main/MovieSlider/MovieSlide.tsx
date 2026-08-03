"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Movie from "../Movie/Movie";
import { IMovieSlider } from "@/src/libs/types";

function MovieSlide({
  movie,
  setMovieId,
  setMovieDetail,
  movieId,
  setIsLoading,
  isMain,
}: IMovieSlider) {
  const pathname = usePathname();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleClick = async () => {
    if (pathname.includes("/kids")) {
      return router.push(
        `/kids/${movie.type === "film" ? "movie" : "series"}/${movie.link}`,
      );
    }

    if (isMain) return false;

    setMovieId(movie._id);
    setMovieDetail(null);
    setIsLoading(true);

    try {
      // دریافت همزمان فیلم و وضعیت بوکمارک
      const [movieRes, bookmarkRes] = await Promise.all([
        fetch(`/api/movie/${movie._id}`),
        fetch(`/api/bookmarks?movieId=${movie._id}`, {
          credentials: 'include',
          cache: 'no-store',
        })
      ]);

      const movieData = await movieRes.json();
      const bookmarkData = await bookmarkRes.json();
      
      // اضافه کردن وضعیت بوکمارک به دیتای فیلم
      const finalData = {
        ...movieData,
        isBookmarked: bookmarkData.isBookmarked || false,
      };
      
      // به‌روزرسانی state محلی
      setIsBookmarked(bookmarkData.isBookmarked || false);
      
      setMovieDetail(finalData);
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div onClick={handleClick} className="movie-slide">
      <div
        className={`transition-all group ${
          movieId === movie._id ? "md:pt-[20px]" : ""
        }`}
      >
        <Movie
          image={movie.mainImage}
          link={movie.link}
          title={movie.title}
          isLink={pathname.includes("/kids")}
          type={movie.type}
          showTime={movie.showTime}
          category={movie.category.title}
          isMain={isMain}
          language={movie?.language}
        />
      </div>
    </div>
  );
}

export default MovieSlide;