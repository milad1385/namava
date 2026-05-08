import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Movie from "../Movie/Movie";

function MovieSlide({ movie, setMovieId, setMovieDetail, movieId }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      onClick={() => {
        if (pathname.includes("/kids")) {
          return router.push(
            `/kids/${movie.type === "film" ? "movie" : "series"}/${movie.link}`,
          );
        }
        setMovieId(movie._id);
        setMovieDetail(movie);
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
          type={movie.type}
          showTime={movie.showTime}
        />
      </div>
    </div>
  );
}

export default MovieSlide;
