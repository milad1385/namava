// components/Skeleton/CollectionSkeleton.jsx
import React from "react";

function CollectionSkeleton() {
  return (
    <div className="block">
      <div className="relative w-[160px] md:w-full  h-[90px] md:h-[189px] bg-gray-700 rounded-md overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className="mt-3">
        <div className="relative h-4 bg-gray-700 rounded w-3/4 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default CollectionSkeleton;
