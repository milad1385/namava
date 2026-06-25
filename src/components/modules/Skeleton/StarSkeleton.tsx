import React from "react";

function StarSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[190px] md:h-[190px] rounded-full bg-gray-700 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className="mt-3 w-full flex justify-center">
        <div className="relative h-4 w-20 sm:w-24 bg-gray-700 rounded overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default StarSkeleton;
