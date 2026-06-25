import React, { forwardRef } from "react";

function PreviewSkeleton({}, ref) {
  return (
    <div ref={ref} className="my-10 hidden md:block animate-pulse">
      <div className="flex items-end justify-between flex-row-reverse relative movie-perview">
        <div className="md:h-[539px] aspect-video w-[75%] bg-gray-700/50 rounded-lg"></div>

        <div className="w-[25%] z-20 right-10 md:h-[539px] rigth-side">
          <div className="relative top-[23%] right-10 space-y-4">
            <div className="h-8 bg-gray-700/50 rounded-md w-3/4 mx-auto md:mx-0"></div>

            <div className="hidden md:flex items-center gap-x-5 mt-5">
              <div className="h-6 w-10 bg-gray-700/50 rounded-full"></div>
              <div className="h-4 w-16 bg-gray-700/50 rounded"></div>
              <div className="h-4 w-20 bg-gray-700/50 rounded"></div>
              <div className="flex items-center gap-x-1">
                <div className="h-5 w-12 bg-gray-700/50 rounded"></div>
              </div>
            </div>

            <div className="hidden md:block space-y-2 mt-5">
              <div className="h-4 bg-gray-700/50 rounded w-full"></div>
              <div className="h-4 bg-gray-700/50 rounded w-[90%]"></div>
              <div className="h-4 bg-gray-700/50 rounded w-[80%]"></div>
            </div>

            <div className="h-4 bg-gray-700/50 rounded w-3/4 mx-auto md:mx-0 my-3"></div>

            <div className="flex items-center justify-center w-[500px] md:justify-start gap-x-4 mt-4">
              <div className="h-12 w-32 bg-gray-700/50 rounded-xl"></div>
              <div className="h-12 w-12 bg-gray-700/50 rounded-full"></div>
              <div className="h-12 w-12 bg-gray-700/50 rounded-full"></div>
              <div className="h-12 w-12 bg-gray-700/50 rounded-full"></div>
              <div className="h-12 w-24 bg-gray-700/50 rounded"></div>
            </div>

            <div className="text-xs hidden md:flex text-[#ccc] mt-5 items-center gap-x-1">
              <div className="h-4 w-16 bg-gray-700/50 rounded"></div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-12 bg-gray-700/50 rounded"></div>
                <div className="h-4 w-12 bg-gray-700/50 rounded"></div>
                <div className="h-4 w-12 bg-gray-700/50 rounded"></div>
                <div className="h-4 w-12 bg-gray-700/50 rounded"></div>
              </div>
            </div>

            <div className="h-4 w-32 bg-gray-700/50 rounded hidden md:block mt-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(PreviewSkeleton);
