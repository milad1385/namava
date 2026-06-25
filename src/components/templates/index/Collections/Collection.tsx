"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Collection {
  title: string;
  link: string;
  image: string;
}

function Collection({ image, title, link }: Collection) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link
      href={`/collection/${link}`}
      className="block"
      title={`مجموعه فیلم های ${title}`}
    >
      <div className="relative w-full">
        {!isImageLoaded && (
          <div className="w-full h-[90px] md:h-[170px] bg-gray-700 rounded-md overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        )}

        <Image
          src={image}
          alt={title}
          width={450}
          height={189}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-[90px] md:h-[170px] object-cover rounded-md transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <h3 className="mt-3 text-xs">مجموعه فیلم های {title}</h3>
    </Link>
  );
}

export default Collection;