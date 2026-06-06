"use client";
import React, { useState } from "react";
import { FaCheck, FaCircleInfo } from "react-icons/fa6";

type Ages = {
  setAge: React.Dispatch<React.SetStateAction<number>>;
  age: number;
};
function Ages({ setAge, age }: Ages) {
  return (
    <div className="max-w-[700px] mx-auto text-white flex flex-col items-center md:items-start gap-x-3 md:gap-x-8 px-4 md:px-10 py-6 md:py-[30px] bg-namavaBlack rounded-xl mt-10">
      <div className="flex items-center gap-x-3">
        <FaCircleInfo className="text-xl" />
        <span className="text-lg">لطفا رده سنی را مشخص کنید</span>
      </div>
      <div className="w-full flex mt-8" dir="ltr">
        <div
          className={`h-0.5 ${
            age >= 3 ? "bg-namavaGreen" : "bg-white"
          }  w-[43px] relative`}
          onClick={() => setAge(3)}
        >
          <div
            className={`circle-item ${
              age >= 3 ? "bg-namavaGreen" : "bg-white"
            }`}
          >
            {age === 3 && <FaCheck className="text-sm text-black" />}
          </div>
        </div>
        <div
          className={`circle ${age >= 7 ? "bg-namavaGreen" : "bg-white"}`}
          onClick={() => setAge(7)}
        >
          <div
            className={`circle-item ${
              age >= 7 ? "bg-namavaGreen" : "bg-white"
            }`}
          >
            {age === 7 && <FaCheck className="text-sm text-black" />}
          </div>
        </div>
        <div
          className={`circle ${age >= 12 ? "bg-namavaGreen" : "bg-white"}`}
          onClick={() => setAge(12)}
        >
          <div
            className={`circle-item ${
              age >= 12 ? "bg-namavaGreen" : "bg-white"
            }`}
          >
            {age === 12 && <FaCheck className="text-sm text-black" />}
          </div>
        </div>
        <div
          className={`circle ${age >= 15 ? "bg-namavaGreen" : "bg-white"}`}
          onClick={() => setAge(15)}
        >
          <div
            className={`circle-item ${
              age >= 15 ? "bg-namavaGreen" : "bg-white"
            }`}
          >
            {age === 15 && <FaCheck className="text-sm text-black" />}
          </div>
        </div>
        <div
          className={`h-0.5 ${
            age >= 18 ? "bg-namavaGreen" : "bg-white"
          } w-[150px] relative`}
        ></div>
        <div
          className={`h-0.5 ${
            age >= 18 ? "bg-namavaGreen" : "bg-white"
          } flex-center w-[43px] relative`}
          onClick={() => setAge(18)}
        >
          <div
            className={`w-[20px] h-[20px] flex-center ${
              age >= 18 ? "bg-namavaGreen" : "bg-white"
            }  rounded-full absolute left-0`}
          >
            {age === 18 && <FaCheck className="text-sm text-black" />}
          </div>
        </div>
      </div>
      <div className="w-full flex mt-10 font-Dana text-black " dir="ltr">
        <div className="h-0.5  w-[43px] relative">
          <div
            className="w-[20px] h-[20px] rounded-md flex-center font-bold text-sm absolute -translate-y-1/2 -right-3 three"
            onClick={() => setAge(3)}
          >
            +3
          </div>
        </div>
        <div className="h-0.5  w-[150px] relative">
          <div
            className="w-[20px] h-[20px]  rounded-md flex-center font-bold text-sm absolute -translate-y-1/2 -right-3 seven"
            onClick={() => setAge(7)}
          >
            +7
          </div>
        </div>
        <div className="h-0.5  w-[150px] relative">
          <div
            className="w-[20px] h-[20px]  rounded-md flex-center font-bold text-sm absolute -translate-y-1/2 -right-3 twelve"
            onClick={() => setAge(12)}
          >
            +12
          </div>
        </div>
        <div className="h-0.5  w-[150px] relative">
          <div
            className="w-[20px] h-[20px]  rounded-md flex-center font-bold text-sm absolute -translate-y-1/2 -right-3 fifteen"
            onClick={() => setAge(15)}
          >
            +15
          </div>
        </div>
        <div className="h-0.5  w-[150px] relative"></div>
        <div className="h-0.5  w-[43px] relative">
          <div
            className="w-[20px] h-[20px]  bg-white rounded-md flex-center font-bold text-sm absolute -translate-y-1/2 -left-3 eighteen"
            onClick={() => setAge(18)}
          >
            +18
          </div>
        </div>
      </div>

      <p className="mt-16 text-xs md:text-sm">
        برای رده‌های سنی ۳+ و ۷+ پروفایل به حالت کودک تغییر خواهد کرد.
      </p>
    </div>
  );
}

export default Ages;
