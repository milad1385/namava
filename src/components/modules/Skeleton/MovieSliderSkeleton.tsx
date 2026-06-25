"use client";
import React from "react";
import SliderTitleSkeleton from "./SliderTitleSkeleton";
import { usePathname } from "next/navigation";

function MovieSliderSkeleton() {
  const pathname = usePathname();
  const isKid = pathname.includes("/kids");

  const bgColor = isKid ? "bg-gray-200" : "bg-gray-700";
  const bgColorLight = isKid ? "bg-gray-200" : "bg-gray-700";
  const shimmerColor = isKid ? "via-white/70" : "via-white/20";

  return (
    <div className="container mt-[30px] md:mt-5">
      <SliderTitleSkeleton bgColor={bgColorLight} />
      <div className="mt-10 md:h-[21rem]">
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide px-1">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="min-w-[calc(34%-10px)] md:min-w-0 snap-start animate-pulse"
            >
              <div className="relative">
                <div
                  className={`${bgColor} rounded-md w-full lg:w-full lg:h-[280px] md:w-auto h-[160px] md:h-auto overflow-hidden relative`}
                >
                  <div
                    className={`absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent`}
                  ></div>
                </div>

                <div className="absolute inset-0 flex justify-end flex-col rounded-md">
                  <div className="pb-6 px-2 space-y-2 md:space-y-3">
                    <div className="flex gap-x-2">
                      <div className={`h-3 ${bgColorLight} rounded w-12`}></div>
                      <div className={`h-3 ${bgColorLight} rounded w-16`}></div>
                      <div className={`h-3 ${bgColorLight} rounded w-10`}></div>
                    </div>
                    <div className="flex gap-x-1">
                      <div
                        className={`h-4 w-4 ${bgColorLight} rounded-full`}
                      ></div>
                      <div className={`h-3 ${bgColorLight} rounded w-8`}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`h-3 ${bgColor} rounded w-3/4 mt-3 mr-3 overflow-hidden relative`}
              >
                <div
                  className={`absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieSliderSkeleton;
