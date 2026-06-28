import React from "react";

function AiRecommendationTitle({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-x-2 md:gap-x-4 border-b border-white">
      {icon}
      <h2 className="text-base md:text-2xl font-bold md:mb-2 text-right  pb-4">
        {title}
      </h2>
    </div>
  );
}

export default AiRecommendationTitle;
