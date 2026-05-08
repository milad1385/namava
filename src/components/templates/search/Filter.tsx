"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { country, date, orderType, voiceType } from "@/public/db";
import FilterItem from "./FilterItem";

type Filter = {
  className?: string;
  onShow?: any;
  categories?: any;
};

function Filter({ className, onShow, categories }: Filter) {
  const [curOpen, setCurOpen] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const handleTypeChange = (slug: string, e: any) => {
    if (e.target.checked) {
      params.append("type", slug);
    } else {
      params.delete("type", slug);
    }

    router.replace(`${pathname}?${params}`);
  };

  const isKid = pathname.includes("/kids/search");

  return (
    <div
      className={`w-[300px] fixed  ${isKid ? "!text-black bg-gray-200" : "bg-[#37383e]"} rounded-xl  py-4 px-6 ${className}`}
    >
      <section className="flex items-center justify-between pb-5 md:pb-0">
        <div className="flex items-center gap-x-2">
          <BiChevronRight
            className="block md:hidden text-2xl"
            onClick={() => onShow(false)}
          />
          <span>فیلترها</span>
        </div>
        <span
          className="text-namava text-sm"
          onClick={() => {
            router.replace(pathname);
            onShow?.(false);
            setCurOpen?.("");
          }}
        >
          حذف همه
        </span>
      </section>
      <section className="flex items-center gap-x-6  mt-3 border-b pb-3 border-b-gray-500">
        <div className="flex items-center gap-x-2">
          <input
            id="film"
            type="checkbox"
            className={`film-checkbox ${isKid ? "!border !border-black" : "!border !border-white"}`}
            checked={searchParams.getAll("type").includes("film")}
            onChange={(e) => handleTypeChange("film", e)}
          />
          <label htmlFor="film">فیلم</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            id="series"
            type="checkbox"
            className={`series-checkbox ${isKid ? "!border !border-black" : "!border !border-white"}`}
            checked={searchParams.getAll("type").includes("series")}
            onChange={(e) => handleTypeChange("series", e)}
          />
          <label htmlFor="series">سریال</label>
        </div>
      </section>
      {/* start filtering section */}
      <section className="divide-y-[1px] divide-gray-500 child:cursor-pointer">
        <FilterItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          items={categories}
          title="ژانر ها"
          slug="genre"
        />
        <FilterItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          items={country}
          title="کشور سازنده"
          slug="country"
        />
        <FilterItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          items={voiceType}
          title="صدا و زیر نویس"
          slug="voice"
        />
        <FilterItem
          curOpen={curOpen}
          onOpen={setCurOpen}
          items={[]}
          title="سال ساخت"
          slug="year"
          type="date"
          date={date}
        />
        <FilterItem
          onOpen={setCurOpen}
          curOpen={curOpen}
          items={orderType}
          slug="order"
          title="مرتب سازی"
          type="selectBox"
        />
      </section>
    </div>
  );
}

export default Filter;
