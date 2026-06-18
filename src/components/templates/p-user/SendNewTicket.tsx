import Link from "next/link";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";

function SendNewTicket() {
  return (
    <Link href={`/p-user/tickets/new`} className="bg-milafilmBlack flex items-center gap-x-3 md:gap-x-4 border border-gray-800 rounded-lg shadow px-2 py-2 md:px-[1.6rem] md:py-[1rem]">
      <div
        className={`flex-center h-[2.5rem] w-[2.5rem] md:w-[4rem] flex-shrink-0 md:h-[4rem] rounded-full bg-sky-600`}
      >
        <FaPlusCircle className="text-2xl md:text-3xl lg:text-4xl" />
      </div>
      <div className="flex flex-col gap-2.5">
        <h2 className="text-sm md:text-lg text-gray-200 line-clamp-1">
          ایجاد تیکت
        </h2>
        <h1 className="font-Dana  text-gray-400 line-clamp-1 text-xs md:text-base">
          کلیک کنید
        </h1>
      </div>
    </Link>
  );
}

export default SendNewTicket;
