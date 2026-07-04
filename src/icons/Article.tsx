"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Article() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollBy({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
  return (
    <Image
      src="/images/milamag.png"
      alt="milamag.png"
      className="w-[125px] md:w-[150px] rounded-lg mr-4"
      width={1920}
      height={1080}
    />
  );
}

export default Article;
