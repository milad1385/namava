"use client";
import { usePathname } from "next/navigation";
import React from "react";

function Heart({ className }: { className?: string }) {
  const pathname = usePathname();
  const color = pathname.includes("/kids") ? "fill-zinc-800" : "fill-white";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
      className={`${color} ${className}`}
      viewBox="0 0 20 20"
    >
      <path d="M13.548 3a4.55 4.55 0 0 0-3.486 1.642C9.2 3.605 7.925 3.003 6.577 3A4.58 4.58 0 0 0 2 7.577c0 6.2 4.852 10.388 8.062 10.388s8.063-4.184 8.063-10.388A4.58 4.58 0 0 0 13.548 3z"></path>
    </svg>
  );
}

export default Heart;
