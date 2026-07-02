"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
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
  return (
    <div
      onClick={async () => {
        if (pathname.includes("/kids")) {
          return router.push(
            `/kids/${movie.type === "film" ? "movie" : "series"}/${movie.link}`,
          );
        }

        if (isMain) return false;

        setMovieId(movie._id);
        setMovieDetail(null);
        setIsLoading(true);
        const res = await fetch(`/api/movie/${movie._id}`);
        const movieData = await res.json();
        setMovieDetail(movieData);
        setIsLoading(false);
      }}
      className="movie-slide"
    >
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
        />
      </div>
    </div>
  );
}

export default MovieSlide;
