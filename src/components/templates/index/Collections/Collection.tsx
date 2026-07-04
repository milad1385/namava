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
      <div className="relative w-full aspect-[400/189]">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-700 rounded-md overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        )}

        <Image
          src={image}
          alt={title}
          width={400}
          height={189}
          onLoad={() => setIsImageLoaded(true)}
          className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />
      </div>
      <h3 className="mt-3 text-xs">مجموعه فیلم های {title}</h3>
    </Link>
  );
}

export default Collection;