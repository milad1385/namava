import React from "react";
import MovieSliderSkeleton from "./MovieSliderSkeleton";
import KidCollectionSkeleton from "./KidCollectionSkeleton";

function KidMovieSliderSkeleton() {
  return (
    <div className="text-white mt-5">
      <KidCollectionSkeleton />
      <MovieSliderSkeleton />
      <MovieSliderSkeleton />
      <MovieSliderSkeleton />
    </div>
  );
}

export default KidMovieSliderSkeleton;
