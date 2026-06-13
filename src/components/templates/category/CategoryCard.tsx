import { ICategoryCard } from "@/src/libs/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryCard({ title, image, link }: ICategoryCard) {
  return (
    <div className="relative flex items-center">
      {link ? (
        <Link href={`${link}`}>
          <Image
            src={image}
            alt={image}
            width={900}
            height={900}
            className="rounded-md"
          />
        </Link>
      ) : (
        <div className="md:cursor-pointer">
          <Image
            src={image}
            alt={image}
            width={900}
            height={900}
            className="rounded-md"
          />
        </div>
      )}
      <span className="text-sm category-title md:text-xl lg:text-2xl absolute right-3 md:right-6 max-w-[73.9px] md:max-w-[190px]">
        {title}
      </span>
    </div>
  );
}

export default CategoryCard;
