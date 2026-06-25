import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Movie from "../Movie/Movie";

function MovieSlide({
  movie,
  setMovieId,
  setMovieDetail,
  movieId,
  setIsLoading,
}) {
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
        />
      </div>
    </div>
  );
}

export default MovieSlide;
