import React from "react";

function TimeLimit() {
  return (
    <div className="max-w-[700px] mx-auto text-white flex flex-col items-center md:items-start gap-x-3 md:gap-x-8 px-4 md:px-10 py-6 md:py-[30px] bg-milafilmBlack rounded-xl my-10">
      <div className="w-full">
        <h2 className="border-b text-lg border-b-gray-500 pb-5">
          محدود کردن زمان تماشای کودک
        </h2>
        <div className="flex items-center justify-between text-sm mt-5">
          <span>بازه زمانی مجاز برای تماشا را انتخاب کنید.</span>
          <span className="text-red-500 md:cursor-pointer">پاک کردن</span>
        </div>
        <div className="flex items-center gap-x-8 mt-5">
          <div className="flex items-center gap-x-4">
            <span>از : </span>
            <div className="bg-[#37383e] font-Dana text-[13.5px] rounded-lg w-[80px] pr-2 h-[50px] flex items-center justify-center gap-x-2">
              <input
                type="text"
                placeholder="mm"
                className="outline-none  w-full bg-transparent"
              />
              <span>:</span>
              <input
                type="text"
                placeholder="hh"
                className="outline-none  w-full bg-transparent"
              />
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <span>تا : </span>
            <div className="bg-[#37383e] font-Dana text-[13.5px] rounded-lg w-[80px] pr-2 h-[50px] flex items-center justify-center gap-x-2">
              <input
                type="text"
                placeholder="mm"
                className="outline-none  w-full bg-transparent"
              />
              <span>:</span>
              <input
                type="text"
                placeholder="hh"
                className="outline-none  w-full bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLimit;
