"use client";
import React from "react";
import { usePathname } from "next/navigation";

function KidCollectionSkeleton() {
  const pathname = usePathname();
  const isKid = pathname.includes("/kids");

  const bgColor = isKid ? "bg-gray-200" : "bg-gray-700";

  return (
    <div className="pt-16 pb-5 md:py-24 container">
      {/* breakpoints مطابق با سوایپر */}
      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide px-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="min-w-[calc(34%-10px)] md:min-w-0 snap-start flex justify-center"
          >
            <div className="flex flex-col items-center animate-pulse">
              <div
                className={`w-[100px] h-[100px] xs:w-[120px] xs:h-[120px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] lg:w-[260px] lg:h-[260px] rounded-full ${bgColor} overflow-hidden relative`}
              >
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KidCollectionSkeleton;
