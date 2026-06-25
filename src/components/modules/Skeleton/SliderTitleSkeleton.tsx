import React from "react";

interface SliderTitleSkeletonProps {
  bgColor?: string;
  shimmerColor?: string;
  className?: string;
  width?: string;
  height?: string;
}

function SliderTitleSkeleton({ 
  bgColor = "bg-gray-700",
  shimmerColor = "via-white/20",
  className = "",
  width = "w-32 sm:w-40 md:w-56",
  height = "h-5 md:h-8"
}: SliderTitleSkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className={`${height} ${width} ${bgColor} rounded overflow-hidden relative`}>
        {/* افکت shimmer */}
        <div className={`absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent ${shimmerColor} to-transparent`}></div>
      </div>
    </div>
  );
}

export default SliderTitleSkeleton;