import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/auth/Input/Input";
import Label from "@/src/components/modules/auth/Label/Label";
import Desc from "@/src/components/modules/auth/desc/desc";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { FiCode } from "react-icons/fi";

function VerifyOtp() {
  return (
    <>
      <div className="flex items-center gap-x-4 mt-5">
        <FaEnvelope className="text-xl text-milafilm" />
        <span className="text-white text-sm md:text-base">
          ثبت نام با شماره تلفن همراه
        </span>
      </div>
      <Desc title="یک کد به شماره 09336084013 ارسال شد ، لطفا کد را وارد کنید." />
      <div className="space-y-[24px]">
        <div className="flex flex-col gap-y-3">
          <Label title="کد فعال سازی" />
          <div
            className={`bg-[#121212] rounded-xl flex items-center justify-between gap-x-2`}
          >
            <Input
              type="text"
              minLength={11}
              maxLength={11}
              placeholder="کد فعال سازی را وارد نمایید"
            />
            <FiCode className={`text-xl ml-4`} />
          </div>
        </div>
        <Button>ارسال مجدد</Button>
        <Button> ورود</Button>
      </div>
    </>
  );
}

export default VerifyOtp;
