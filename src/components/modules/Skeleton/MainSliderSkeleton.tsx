import React from "react";
import MovieSliderSkeleton from "./MovieSliderSkeleton";
import CollectionsSkeleton from "./CollectionsSkeleton";
import SliderSkeleton from "./SliderSkeleton";
import StarsSliderSkeleton from "./StarsSliderSkeleton";

function MainSliderSkeleton() {
  return (
    <div className="text-white">
      <SliderSkeleton />
      <MovieSliderSkeleton />
      <MovieSliderSkeleton />
      <MovieSliderSkeleton />
      <StarsSliderSkeleton />
      <CollectionsSkeleton />
    </div>
  );
}

export default MainSliderSkeleton;
