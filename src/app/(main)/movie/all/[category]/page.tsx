import MovieSort from "@/src/components/modules/main/Movie/MovieSort";
import MovieSlide from "@/src/components/modules/main/MovieSlider/MovieSlide";
import { getMoviesByCategory } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { notFound } from "next/navigation";
import React from "react";

async function page({ params, searchParams }: TParams) {
  const movies = await getMoviesByCategory(
    params.category as string,
    searchParams.status || "",
  );
  
  if (!movies.length) {
    notFound();
  }
  return (
    <div className="py-24 md:py-28 text-white container">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <h1 className="text-base md:text-xl">
          <span className="hidden md:inline-block"> تمام فیلم و سریال </span>{" "}
          <span>
            {movies[0]?.category?.parrent?.title} - {movies[0]?.category?.title}
          </span>
        </h1>
        <MovieSort />
      </div>
      <div className="mt-10 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5">
        {movies.map((movie: any) => (
          <MovieSlide
            key={movie._id}
            movie={JSON.parse(JSON.stringify(movie))}
            isMain
          />
        ))}
      </div>
    </div>
  );
}

export default page;
