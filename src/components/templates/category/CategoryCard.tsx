"use client";
import { ICategoryCard } from "@/src/libs/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function CategoryCard({ title, image, link }: ICategoryCard) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative flex items-center">
      {link ? (
        <Link href={`${link}`} className="block w-full">
          <div className="relative w-full aspect-[16/9]">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-700 rounded-md overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            )}

            <Image
              src={image}
              alt={image}
              width={900}
              height={506}
              onLoad={() => setIsImageLoaded(true)}
              className={`rounded-md w-full h-full object-cover transition-opacity duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </Link>
      ) : (
        <div className="md:cursor-pointer w-full">
          <div className="relative w-full aspect-[16/9]">
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-700 rounded-md overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            )}

            <Image
              src={image}
              alt={image}
              width={900}
              height={506}
              onLoad={() => setIsImageLoaded(true)}
              className={`rounded-md w-full h-full object-cover transition-opacity duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      )}
      <span className="text-sm category-title md:text-xl lg:text-2xl absolute right-3 md:right-6 max-w-[73.9px] md:max-w-[190px]">
        {title}
      </span>
    </div>
  );
}

export default CategoryCard;
