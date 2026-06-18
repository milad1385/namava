"use client";
import { ITEM_PER_PAGE } from "@/public/db";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function Pagination({ count = 10 }: { count?: number }) {
  const searchParams = useSearchParams();
  const query = Boolean(searchParams.get("q"));
  const { replace } = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const page: any = searchParams.get("page") || 1;

  const hasPrev = ITEM_PER_PAGE * (+page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (+page - 1) + ITEM_PER_PAGE < count;

  const end = ITEM_PER_PAGE * page;
  const start = end - ITEM_PER_PAGE;

  const handleChangePage = (type: string) => {
    const curPage = parseInt(page);
    if (curPage < 1) return false;
    type === "prev"
      ? params.set("page", String(curPage - 1 === 0 ? curPage : curPage - 1))
      : params.set("page", String(curPage + 1));

    replace(`${pathname}?${params}`);
  };
  return (
    <div className="flex items-center text-xs md:text-base justify-between text-white rounded-b-md bg-[#363636] px-3 md:px-10 py-4 border-t border-zinc-400">
      <p className="font-Dana">
        <span className="font-bold">{start + 1}</span> تا{" "}
        <span className="font-bold">{end >= count ? count : end}</span> - از{" "}
        <span className="font-bold">{count}</span> تا
      </p>
      <div className="flex items-center gap-x-2">
        <button
          disabled={!hasNext || query}
          onClick={() => handleChangePage("next")}
          className="flex-center disabled:cursor-not-allowed font-IranMedium w-[60px] md:w-[80px] hover:bg-milafilm transition-all gap-x-2 py-1 rounded-md flex items-center"
        >
          <HiChevronRight />
          بعدی
        </button>
        <button
          disabled={!hasPrev}
          onClick={() => handleChangePage("prev")}
          className="flex-center disabled:cursor-not-allowed font-IranMedium w-[60px] md:w-[80px] hover:bg-milafilm transition-all gap-x-2 py-1 rounded-md flex items-center"
        >
          قبلی
          <HiChevronLeft />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
