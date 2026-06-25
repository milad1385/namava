"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Star {
  src: string;
  title: string;
  link: string;
}

function Star({ src, title, link }: Star) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <Link
        href={`/biography/${link}`}
        className="block rounded-full w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[190px] md:h-[190px] relative"
        title={title}
      >
        {!isImageLoaded && (
          <div className="absolute inset-0 rounded-full bg-gray-700 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        )}

        <Image
          src={src}
          width={400}
          height={500}
          alt={title}
          onLoad={() => setIsImageLoaded(true)}
          className={`rounded-full w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[190px] md:h-[190px] transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </Link>
      <h3 className="text-center mt-3 text-xs md:text-sm">{title}</h3>
    </>
  );
}

export default Star;
