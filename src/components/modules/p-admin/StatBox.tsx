import React from "react";
import { HiOutlineBriefcase } from "react-icons/hi2";

type TStat = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
};

function StatBox({ title, value, icon, color }: TStat) {
  return (
    <div className="bg-milafilmBlack flex items-center gap-x-3 md:gap-x-4 border border-gray-800 rounded-lg shadow px-2 py-2 md:px-[1.6rem] md:py-[1rem]">
      <div className={`flex-center h-[2.5rem] w-[2.5rem] md:w-[4rem] flex-shrink-0 md:h-[4rem] rounded-full ${color}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-2.5">
        <h2 className="text-sm md:text-lg text-gray-200 line-clamp-1">{title}</h2>
        <h1 className="font-Dana  text-gray-400 line-clamp-1 text-xs md:text-base">{value.toLocaleString("fa-IR")}</h1>
      </div>
    </div>
  );
}

export default StatBox;
