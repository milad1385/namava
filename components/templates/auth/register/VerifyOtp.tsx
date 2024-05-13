"use client";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { FiCode } from "react-icons/fi";

function VerifyOtp() {
  const [isActiveMobileNumber, setIsActiveMobileNumber] = useState(false);
  return (
    <>
      <div className="flex items-center gap-x-4 mt-5">
        <FaEnvelope className="text-xl text-namava" />
        <span className="text-white text-sm md:text-base">
          ثبت نام با شماره تلفن همراه
        </span>
      </div>
      <p className="text-[#ccc] text-xs md:text-sm my-6">
        یک کد به شماره 09336084013 ارسال شد ، لطفا کد را وارد کنید.
      </p>
      <div className="space-y-[24px]">
        <div className="flex flex-col gap-y-3">
          <label className="text-xs md:text-sm font-IranMedium">
            کد فعال سازی
          </label>
          <div
            className={`bg-[#121212] rounded-xl flex items-center justify-between gap-x-2`}
          >
            <input
              type="text"
              minLength={11}
              maxLength={11}
              placeholder="کد فعال سازی را وارد نمایید"
              onChange={(e) => {
                if (e.target.value.trim()) {
                  setIsActiveMobileNumber(true);
                } else {
                  setIsActiveMobileNumber(false);
                }
              }}
              dir={isActiveMobileNumber ? "ltr" : "rtl"}
              className={`h-[52px] font-Dana ${
                isActiveMobileNumber ? "text-left" : "text-right"
              }  w-full text-[13px] md:text-sm placeholder:text-gray-200 px-2.5 outline-none bg-transparent`}
            />
            <FiCode className={`text-xl ml-4`} />
          </div>
        </div>
        <button
          className="text-sm w-full  bg-namava font-IranMedium disabled:bg-namava py-3 rounded-xl !mt-10"
          disabled
        >
          ارسال مجدد
        </button>
        <button
          className="text-sm w-full  bg-namava font-IranMedium disabled:bg-namava py-3 rounded-xl !mt-10"
          disabled
        >
          ورود
        </button>
      </div>
    </>
  );
}

export default VerifyOtp;
