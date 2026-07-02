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
    <div className="hidden lg:flex items-center gap-x-2">
      {filterMovieStatus.map((status) => (
        <div
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
