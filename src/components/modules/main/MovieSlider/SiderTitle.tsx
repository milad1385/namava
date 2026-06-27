import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";

interface SliderTitle {
  title: string;
  link?: string;
}
function SiderTitle({ title, link }: SliderTitle) {
  const pathname = usePathname();
  const textColor = pathname.includes("/kids") ? "text-black" : "text-white";
  return (
    <div className="flex items-center gap-x-4 group md:cursor-pointer">
      <h1 className={`font-IranMedium text-base md:text-lg ${textColor}`}>
        {title}
      </h1>
      {link && (
        <Link
          href={link}
          className="opacity-0 invisible group-hover:visible group-hover:opacity-100 flex items-center gap-x-2 text-[13px] transition-all duration-200"
        >
          مشاهده همه
          <FaChevronLeft className="text-[13px]" />
        </Link>
      )}
    </div>
  );
}

export default SiderTitle;
