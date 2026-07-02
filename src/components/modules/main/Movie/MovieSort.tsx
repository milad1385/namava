"use client";
import { filterMovieStatus } from "@/public/db";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function MovieSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const statusName = searchParams.get("status") || "default";
  const handleSort = (sort: string) => {
    params.set("status", sort);
    router.push(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-1.5 md:gap-x-2 mt-5 lg:mt-0">
      {filterMovieStatus.map((status) => (
        <div
          key={status.id}
          className={`sort-item ${status.slug === statusName ? "active-sort" : ""}`}
          onClick={() => handleSort(status.slug)}
        >
          {status.name}
        </div>
      ))}
    </div>
  );
}

export default MovieSort;
