"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/auth/Input/Input";
import Label from "@/src/components/modules/auth/Label/Label";
import Desc from "@/src/components/modules/auth/desc/desc";
import Remember from "@/src/icons/Remember";
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";

function SendEmail() {
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  return (
    <>
      <div className="flex items-center gap-x-4 mt-5">
        <Remember />
        <span className="text-white text-sm md:text-base">
          بازیابی رمز عبور
        </span>
      </div>
      <Desc title="کاربر گرامی ، لطفا ایمیل خود را با دقت وارد نمایید" />
      <div className="space-y-[24px]">
        <div className="flex flex-col gap-y-3">
          <Label title="ایمیل" />
          <div
            className={`bg-[#121212] rounded-xl flex items-center justify-between gap-x-2`}
          >
            <Input
              type="text"
              minLength={11}
              maxLength={11}
              placeholder="ایمیل خود را وارد کنید ..."
              onChange={(e) => {
                if (e.target.value.trim()) {
                  setIsActiveEmail(true);
                } else {
                  setIsActiveEmail(false);
                }
              }}
              dir={isActiveEmail ? "ltr" : "rtl"}
              className={isActiveEmail ? "text-left" : "text-right"}
            />
            <FaEnvelope className={`text-xl ml-4`} />
          </div>
        </div>
        <Button>ارسال درخواست</Button>
      </div>
    </>
  );
}

export default SendEmail;
