"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

function SeasonOption({ seasons }: any) {
  const searchParams = useSearchParams();
  const [activeSeason, setActiveSeason] = useState(
    Number(searchParams.get("season") || 1),
  );
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { push } = useRouter();
  const isKid = pathname.includes("/kids");
  const changeSeasonHandler = (seasonNumber: number) => {
    setActiveSeason(seasonNumber);
    params.set("season", String(seasonNumber));
    push(`${pathname}?${params}`, {
      scroll: false,
    });
  };
  return (
    <div
      className={`${isKid ? "bg-black text-white" : "bg-white text-black"} relative group flex items-center justify-center  rounded-md py-2 px-2 gap-x-4 w-[100px]`}
    >
      <p className="font-Dana text-sm md:text-base">فصل {activeSeason}</p>
      <FaChevronDown className="text-base md:text-lg" />

      <div className="absolute flex py-4 opacity-0 shadow invisible group-hover:opacity-100 group-hover:visible transition-all delay-75 justify-center bg-white top-12 right-0 z-20 w-[150px] rounded-md">
        <ul className="flex flex-col gap-y-4 justify-between cursor-pointer hover:child:text-milafilm">
          {seasons.map((season: any, index: number) => (
            <li
              key={season._id}
              className={`text-black ${activeSeason === season.seasonNumber ? "text-milafilm" : ""}`}
              onClick={() => changeSeasonHandler(season.seasonNumber)}
            >
              فصل {season.seasonNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SeasonOption;
