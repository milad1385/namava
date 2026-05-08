"use client";
import Search from "@/src/icons/Search";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Filter from "./Filter";
import Button from "@/src/components/modules/auth/Button/Button";
import { FaXmark } from "react-icons/fa6";

function SearchBox({
  categories,
  q,
  movies,
}: {
  categories: any;
  q: string;
  movies: any;
}) {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const handleSearch = useDebouncedCallback((value: string) => {
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params}`);
  }, 300);

  const isKid = pathname.includes("/kids/search");

  return (
    <>
      <div className="flex items-center gap-x-2">
        <div
          onClick={() => setIsShow(true)}
          className="relative block md:hidden bg-white text-sm text-namavaBlack py-3 rounded-xl px-5"
        >
          فیلتر
          <span className="absolute -top-2 text-sm -left-2 rounded-md font-Dana bg-namava text-white w-[21px] h-[19.41px] flex-center">
            {searchParams.size}
          </span>
        </div>
        <div
          className={`${isKid ? "bg-gray-200" : "bg-[#37383e]"} text-[13px] md:text-base w-full py-2 px-3 md:py-4 md:px-6 rounded-xl flex items-center justify-between gap-x-2`}
        >
          <div className="flex items-center gap-x-2 w-full">
            <Search
              className={`!w-[30px] !h-[30px] ${isKid ? "!fill-black" : "!fill-white"} `}
            />
            <input
              value={searchValue}
              type="text"
              placeholder="فیلم ، سریال ، بازیگر و ژانر"
              className={`bg-transparent  outline-none ${isKid ? "text-zinc-800" : "text-[#cccc]"} w-full`}
              onChange={(e) => {
                handleSearch(e.target.value);
                setSearchValue(e.target.value);
              }}
            />
          </div>
          {searchValue.length > 2 && (
            <FaXmark
              onClick={() => {
                setSearchValue("");
                params.delete("q");
                router.replace(`${pathname}?${params}`);
              }}
              className={`text-lg ${isKid ? "text-black" : "text-white"} md:text-xl cursor-default md:cursor-pointer`}
            />
          )}
        </div>
        <div
          className={`fixed md:opacity-0 md:invisible inset-0 ${
            isShow ? "opacity-100 visible" : "opacity-0 invisible"
          }  z-50 text-white`}
        >
          <Filter
            categories={categories}
            className="w-full h-full !rounded-none"
            onShow={setIsShow}
          />
          <div
            className="absolute bottom-10 flex-center w-full"
            onClick={() => setIsShow(false)}
          >
            <Button className="!w-[300px]">اعمال فیلتر</Button>
          </div>
        </div>
      </div>

      {q?.length > 2 && movies.length > 2 && (
        <div className="hidden md:flex items-center gap-x-8 mt-6 text-sm">
          <span className={`${isKid ? "text-namava" : "text-[#ccc]"}`}>
            کلمات مشابه :
          </span>
          <div
            className={`flex items-center gap-x-4 flex-wrap ${isKid ? "text-black" : "text-white"}`}
          >
            {movies.map((movie: any) => (
              <span
                key={movie._id}
                onClick={() => {
                  params.set("q", movie.title.trim());
                  setSearchValue(movie.title.trim());
                  router.replace(`${pathname}?${params}`);
                }}
              >
                {movie.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchBox;
