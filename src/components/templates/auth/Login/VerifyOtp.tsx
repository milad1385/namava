"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/auth/Input/Input";
import Label from "@/src/components/modules/auth/Label/Label";
import Desc from "@/src/components/modules/auth/desc/desc";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { FiCode } from "react-icons/fi";

function VerifyOtp() {
  const [isActiveMobileNumber, setIsActiveMobileNumber] = useState(false);
  return (
    <>
      <div className="flex items-center gap-x-4 mt-5">
        <FaEnvelope className="text-xl text-milafilm" />
        <span className="text-white text-sm md:text-base">
          ورود از طریق کد یکبار مصرف
        </span>
      </div>
      <Desc title="لطفا کد ارسال شده را وارد نمایید" />
      <div className="space-y-[24px]">
        <div className="flex flex-col gap-y-3">
          <Label title="کد یکبار مصرف" />
          <div
            className={`bg-[#121212] rounded-xl flex items-center justify-between gap-x-2`}
          >
            <Input
              type="text"
              minLength={11}
              maxLength={11}
              placeholder="کد یکبار مصرف را وارد نمایید"
              onChange={(e) => {
                if (e.target.value.trim()) {
                  setIsActiveMobileNumber(true);
                } else {
                  setIsActiveMobileNumber(false);
                }
              }}
              dir={isActiveMobileNumber ? "ltr" : "rtl"}
              className={isActiveMobileNumber ? "text-left" : "text-right"}
            />
            <FiCode className={`text-xl ml-4`} />
          </div>
        </div>
        <Button>ورود</Button>
      </div>
    </>
  );
}

export default VerifyOtp;
