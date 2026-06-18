"use client";
import Overlay from "@/src/components/modules/Overlay/Overlay";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

function ShowMore({ bio }: { bio: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="flex items-center gap-x-3 text-sm md:hidden mt-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        بیشتر <FaChevronDown className="text-xs" />
      </button>
      <Overlay isOpen={isOpen} onClose={setIsOpen} />
      <div
        className={`h-1/2 bg-milafilmBlack fixed left-0 right-0 z-50 ${
          isOpen ? "bottom-0" : "-bottom-[50%]"
        } transition-all p-4`}
      >
        <h3 className="text-center mb-4">جزییات</h3>
        <FaChevronUp
          className="absolute top-6 right-4"
          onClick={() => setIsOpen(false)}
        />
        <p className="text-xs/[25px] line-clamp-[10] md:text-sm/[25px] text-justify md:h-auto relative">
          {bio}
        </p>
      </div>
    </>
  );
}

export default ShowMore;
