import { TArticle } from "@/src/libs/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ArticleBox({ title, image, createdAt, readingTime, link }: TArticle) {
  return (
    <Link href={`/blog/${link}`} className="shadow-2xl">
      <Image
        src={image}
        alt={image}
        width={1920}
        height={1080}
        className="rounded-t-md h-[180px] md:h-[156px]"
      />
      <div className="bg-milafilmBlack rounded-b-md p-3 text-white text-sm space-y-2">
        <div className="font-Dana text-xs text-[#aaa] flex items-center justify-between">
          <span>{createdAt}</span>
          <span>{readingTime as string} دقیقه</span>
        </div>
        <h2 className="line-clamp-1">{title}</h2>
      </div>
    </Link>
  );
}

export default ArticleBox;
