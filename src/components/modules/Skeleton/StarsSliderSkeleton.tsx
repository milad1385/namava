import React from "react";
import StarSkeleton from "./StarSkeleton";

function StarsSliderSkeleton() {
  return (
    <div className="container mt-10 text-white">
      <div className="flex items-center gap-x-3 animate-pulse">
        <div className="h-7 w-48 bg-gray-700 rounded"></div>
      </div>

      <div className="my-10">
        <div className="flex lg:grid lg:grid-cols-7 gap-3 lg:gap-5 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="min-w-[calc(33%-8px)] sm:min-w-[calc(25%-8px)] md:min-w-[calc(16.666%-8px)] lg:min-w-0 snap-start flex justify-center"
            >
              <StarSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StarsSliderSkeleton;
