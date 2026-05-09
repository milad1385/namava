import Link from "next/link";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";

interface SliderTitle {
  title: string;
  link?: string;
}
function SiderTitle({ title, link }: SliderTitle) {
  return (
    <div className="flex items-center justify-between  gap-x-4  md:cursor-pointer">
      <h1 className="font-IranMedium text-[13px] md:text-lg">{title}</h1>
      {link && (
        <Link
          href={link}
          className="flex items-center gap-x-2 text-[13px] transition-all duration-200"
        >
          مشاهده <span className="hidden md:block">همه</span>
          <FaChevronLeft className="text-[13px]" />
        </Link>
      )}
    </div>
  );
}

export default SiderTitle;
