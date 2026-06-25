// components/Skeleton/CollectionsSkeleton.jsx
import React from "react";
import CollectionSkeleton from "./CollectionSkeleton";

function CollectionsSkeleton() {
  return (
    <div className="container pb-10 md:pt-10 md:pb-20 text-white">
      <div className="flex items-center gap-x-3 animate-pulse">
        <div className="h-7 w-56 bg-gray-700 rounded"></div>
      </div>

      <div className="my-5">
        <div className="flex md:grid md:grid-cols-4   md:gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="min-w-[170px] md:min-w-0 snap-start">
              <CollectionSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollectionsSkeleton;
