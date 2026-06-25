"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Slider({ collection, className }: any) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      title={collection?.title}
      href={`/kids/collections/${collection?.link}`}
      className="block"
    >
      <div
        className={`relative mx-auto ${className || "w-[110px] h-[110px] xs:w-[130px] xs:h-[130px] sm:w-[160px] sm:h-[160px] md:w-[220px] md:h-[220px] lg:w-[266px] lg:h-[266px]"}`}
      >
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-300 rounded-full overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
        )}

        <Image
          src={collection?.mainImage}
          alt={collection?.title}
          width={500}
          height={500}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover rounded-full shadow-sm transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </Link>
  );
}

export default Slider;
