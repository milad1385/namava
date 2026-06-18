import Search from "@/src/icons/Search";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { FaTrash, FaXmark } from "react-icons/fa6";
import { useDebouncedCallback } from "use-debounce";

interface FilterItem {
  title: string;
  items: item[];
  slug: string;
  onOpen: React.Dispatch<React.SetStateAction<string | null>>;
  curOpen: string | null;
  type?: string;
  date?: TDate;
}

type TDate = {
  shamsi: number[];
  miladi: number[];
};

type item = {
  name: string;
  id: number;
  slug?: string;
};

function FilterItem({
  title,
  items,
  slug,
  onOpen,
  curOpen,
  type,
  date,
}: FilterItem) {
  const isOpen = title === curOpen;
  const [search, setSearchValue] = useState("");
  const [dateType, setDateType] = useState("miladi");
  const [searchedItems, setSearchedItems] = useState(items);
  const inputRef = useRef<HTMLInputElement>(null);

  const subMenuRef = useRef<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const isKid = pathname.includes("/kids");

  const handleFilterChange = (item: string, e: any, type?: string) => {
    if (e.target.checked) {
      if (type === "select") {
        params.set(slug, item);
      } else {
        params.append(slug, item);
      }
    } else {
      params.delete(slug, item);
    }
    router.replace(`${pathname}?${params}`);
  };

  const deleteUserFilter = () => {
    params.delete(slug);
    onOpen("");
    router.replace(`${pathname}?${params}`);
  };

  const handleSearch = useDebouncedCallback((value) => {
    if (value.trim()) {
      const searchedResult = items.filter((item) => item.name.includes(value));
      setSearchedItems(searchedResult);
    } else {
      setSearchedItems(items);
    }
  }, 300);

  const handleToggle = () => {
    onOpen(isOpen ? null : title);
  };

  const handleChangeDate = (value: any, key: string) => {
    const from = searchParams.get(key);
    const to = searchParams.get(key);

    if (from !== null) {
      params.set(key, value);
    } else if (!from && !to) {
      params.set(key, value);
    }

    router.replace(`${pathname}?${params}`);
  };

  const fromDate = searchParams?.get("from") || 0;

  useEffect(() => {
    if (isOpen) {
      const height = subMenuRef.current.scrollHeight;
      subMenuRef.current.style.height = height + "px";
    } else {
      subMenuRef.current.style.height = 0 + "px";
    }
  }, [isOpen]);

  return (
    <div>
      <div
        className="flex items-center justify-between py-4 overflow-hidden"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-x-2.5">
          <span>{title}</span>
          {searchParams.get(slug) && type !== "selectBox" && (
            <span className="bg-milafilm flex-center w-5 h-5 font-Dana text-xs rounded-md">
              <span className="mt-0.5">{searchParams.getAll(slug).length}</span>
            </span>
          )}

          {slug === "year" &&
            (searchParams.get("from") || searchParams.get("to")) && (
              <span className="bg-milafilm flex-center px-2 py-1 font-Dana text-xs rounded-md">
                <span className="mt-0.5">
                  {searchParams.get("from")} - {searchParams.get("to")}
                </span>
              </span>
            )}
        </div>
        <span>
          <BiSolidChevronDown
            className={`text-xl font-bold transition-all ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </div>
      <div className="submenu" ref={subMenuRef}>
        {type === "selectBox" ? (
          <div className="space-y-4">
            {items.map((item) => (
              <div className="flex items-center gap-x-2" key={item.id}>
                <input
                  className={`radio-input ${isKid ? "border border-black" : "border border-white"}`}
                  type="radio"
                  name="order"
                  onChange={(e) =>
                    handleFilterChange(String(item.slug), e, "select")
                  }
                />
                <label className="text-sm">{item.name}</label>
              </div>
            ))}
          </div>
        ) : type === "date" ? (
          <>
            <div className="flex items-center gap-x-10">
              <div className="flex items-center gap-x-2">
                <input
                  className={`radio-input ${isKid ? "border border-black" : "border border-white"}`}
                  type="radio"
                  name="date"
                  onChange={() => setDateType("shamsi")}
                />
                <label className="text-sm">شمسی</label>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  className={`radio-input ${isKid ? "border border-black" : "border border-white"}`}
                  type="radio"
                  name="date"
                  defaultChecked
                  onChange={() => setDateType("miladi")}
                />
                <label className="text-sm">میلادی</label>
              </div>
            </div>
            <div className="py-6 space-y-4">
              <div className="flex items-center gap-x-4">
                <span>از</span>
                <select
                  onChange={(e) => handleChangeDate(e.target.value, "from")}
                  className="text-black text-sm font-Dana w-full rounded-md outline-none p-2 appearance-none"
                >
                  {dateType === "miladi"
                    ? date?.miladi.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))
                    : date?.shamsi.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                </select>
              </div>
              <div className="flex items-center gap-x-3.5">
                <span>تا</span>
                <select
                  onChange={(e) => handleChangeDate(e.target.value, "to")}
                  className="text-black text-sm font-Dana w-full rounded-md outline-none p-2 appearance-none"
                >
                  {dateType === "miladi"
                    ? date?.miladi.map((option) => (
                        <option
                          disabled={option <= +fromDate ? true : false}
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))
                    : date?.shamsi.map((option) => (
                        <option
                          disabled={option <= +fromDate ? true : false}
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-[#121212] mb-2 w-full py-2 pl-3 pr-2  rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <Search className="!w-[30px] !h-[30px] !fill-white" />
                <input
                  ref={inputRef}
                  value={search}
                  type="text"
                  placeholder={`${title} را جستجو کنید`}
                  onChange={(e) => {
                    handleSearch(e.target.value);
                    setSearchValue(e.target.value);
                  }}
                  className="bg-transparent placeholder:text-xs text-sm outline-none text-[#cccc] w-full"
                />
              </div>
              {inputRef.current?.value && (
                <FaXmark
                  onClick={() => {
                    setSearchValue("");
                    onOpen(null);
                    setSearchedItems(items);
                  }}
                />
              )}
            </div>
            <div className="submenu-container max-h-[240px] overflow-y-auto">
              {searchParams.get(slug)?.length && (
                <>
                  <div className="flex items-center justify-between pl-2">
                    <span
                      className={`text-sm ${isKid ? "text-zinc-700" : "text-[#ccc]"} `}
                    >
                      انتخاب شما
                    </span>
                    <FaTrash
                      className="text-milafilm"
                      onClick={deleteUserFilter}
                    />
                  </div>
                  <ul className="space-y-4 my-4">
                    {searchParams.getAll(slug).map((item, index) => (
                      <li key={index}>
                        <div className="flex items-center gap-x-2">
                          <input
                            id={item}
                            checked={searchParams.getAll(slug).includes(item)}
                            type="checkbox"
                            className={`film-checkbox ${isKid ? "border border-black" : "border border-white"}`}
                            onChange={(e) => handleFilterChange(item, e)}
                          />
                          <label className="text-sm" htmlFor={item}>
                            {item}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <span
                className={`text-sm ${isKid ? "text-zinc-700" : "text-[#ccc]"} `}
              >
                همه {title}{" "}
              </span>
              <ul className="space-y-4 my-4">
                {searchedItems?.map((item, index) => (
                  <li key={index}>
                    <div className="flex items-center gap-x-2">
                      <input
                        id={item.name}
                        checked={searchParams.getAll(slug).includes(item.name)}
                        type="checkbox"
                        className={`film-checkbox ${isKid ? "border border-black" : "border border-white"}`}
                        onChange={(e) => handleFilterChange(item.name, e)}
                      />
                      <label className="text-sm" htmlFor={item.name}>
                        {item.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FilterItem;
