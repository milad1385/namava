"use client";
import Search from "@/src/icons/Search";
import React, { useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";

function TitleLimit({ movies, limitedMovie, limites, setLimites }: any) {
  const [search, setSearch] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  const allMovies = movies.filter(
    (movie: any) =>
      !movie.title.includes(limitedMovie) && movie.title.includes(search)
  );

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    if (e.target.value.trim()) {
      boxRef.current?.classList.add("active");
    } else {
      boxRef.current?.classList.remove("active");
    }
  };

  const itemClickHandler = (movie: any) => {
    const isExist = limites.some((limit: any) => limit._id === movie._id);
    boxRef.current?.classList.remove("active");
    setSearch("");
    if (!isExist) {
      setLimites((prev: any) => [
        ...prev,
        { title: movie.title, _id: movie._id },
      ]);
    }
  };

  const removeItem = (id: string) => {
    setLimites((prev: any) => prev.filter((limit: any) => limit._id !== id));
  };
  
  return (
    <div className="max-w-[700px] mx-auto text-white flex flex-col items-center md:items-start gap-x-3 md:gap-x-8 px-4 md:px-10 py-6 md:py-[30px] bg-namavaBlack rounded-xl my-10">
      <div className="w-full">
        <h2 className="border-b text-lg border-b-gray-500 pb-5">
          محدود کردن در پخش عناوین خاص
        </h2>
        <div className="pt-5">
          <h3 className="text-sm">
            عناوینی که میخواهید در این پروفایل اجازه پخش نداشته باشند را مشخص
            کنید.
          </h3>
          <div className="relative">
            <div className="bg-[#37383e] text-[13px] md:text-base w-full py-2 px-3 md:py-3 rounded-xl flex items-center justify-between gap-x-2 mt-5">
              <div className="flex items-center gap-x-2">
                <Search className="!w-[30px] !h-[30px] !fill-white" />
                <input
                  type="text"
                  value={search}
                  placeholder="فیلم ، سریال ، بازیگر و ژانر"
                  onChange={handleSearch}
                  className="bg-transparent outline-none text-[#cccc] w-full"
                />
              </div>
              {search.length > 0 && (
                <FaXmark
                  onClick={() => {
                    boxRef.current?.classList.remove("active");
                    setSearch("");
                  }}
                />
              )}
            </div>
            <div
              ref={boxRef}
              className={`w-full z-10 absolute submenu-container  mt-2.5 max-h-[25vh] overflow-y-auto rounded-xl bg-[#37383e]  px-4 invisible opacity-100 transition-all`}
            >
              {/* <p>متاسفانه نتیجه ای یافت نشد.</p> */}
              <ul
                className={`child:h-[50px] child:md:cursor-pointer child:flex child:items-center child:text-[#ccc]`}
              >
                {allMovies.map((movie: any) => (
                  <li
                    key={movie._id}
                    className="hover:text-white"
                    onClick={() => itemClickHandler(movie)}
                  >
                    {movie.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {limites.length ? (
            <ul className="mt-5 space-y-5">
              {limites.map((limit: any, index: number) => (
                <li
                  className="bg-[#37383e] flex items-center justify-between py-4 px-4 rounded-xl"
                  key={index}
                >
                  <span className="text-[13px]">{limit.title}</span>
                  <FaXmark
                    className="text-[#ccc] text-lg cursor-pointer"
                    onClick={() => removeItem(limit._id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm">عنوانی انتخاب نشده است.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TitleLimit;
