"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { useDebouncedCallback } from "use-debounce";

function Search() {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const handleSearch = useDebouncedCallback((value: string) => {
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params}`);
  }, 300);

  const deleteSearchParam = () => {
    params.delete("q");
    router.replace(`${pathname}?${params}`);
    setSearch("");
  };
  return (
    <div className="bg-namavaBlack w-full md:w-[20%] rounded-md px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <FaMagnifyingGlass className="text-white" />
        <input
          value={search}
          className="border-none outline-none w-full bg-transparent text-white"
          type="text"
          defaultValue={query}
          placeholder="جستجو کنید"
          onChange={(e) => {
            handleSearch(e.target.value);
            setSearch(e.target.value);
          }}
        />
      </div>
      {query && (
        <FaXmark
          className="text-white cursor-pointer"
          onClick={() => deleteSearchParam()}
        />
      )}
    </div>
  );
}

export default Search;
