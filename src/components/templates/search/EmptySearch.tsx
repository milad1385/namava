"use client";
import SearchMovie from "@/src/icons/SearchMovie";
import { usePathname } from "next/navigation";
import React from "react";

function EmptySearch() {
  const pathname = usePathname();
  const isKid = pathname.includes("/kids/search");
  return (
    <div className="flex-center flex-col gap-y-4 mt-10">
      <SearchMovie />
      <p className={`${isKid ? "text-zinc-700" :"text-[#bab8b8]"} max-w-[400px] text-sm/6 text-center px-[18px]`}>
        عنوان فیلم، سریال یا بازیگر مورد نظر خود را جستجو کنید و یا از طریق
        فیلتر‌های موجود، فیلم و سریال مورد علاقه خود را پیدا کنید.
      </p>
    </div>
  );
}

export default EmptySearch;
