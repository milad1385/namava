import Button from "@/src/components/modules/auth/Button/Button";
import Logo from "@/src/icons/Logo";
import Image from "next/image";
import React from "react";

function PinLock() {
  return (
    <div className="text-white flex-center flex-col">
      <div className="flex items-center justify-center flex-col space-y-4">
        <Logo className="!w-[50px] md:!w-[80px] !h-[50px] md:!h-[80px]" />
        <h1 className="text-lg md:text-2xl text-center">قفل پروفایل</h1>
      </div>
      <div className="mt-8">
        <Image
          src="/images/customProfile.jpg"
          alt="user.svg"
          width={150}
          height={150}
          className="rounded-full w-[100px] h-[100px]"
        />
        <h3 className="text-center mt-5 md:text-3xl">میلاد</h3>
      </div>
      <div className="mt-10 flex-center flex-col space-y-5">
        <h3 className="text-base md:text-lg font-IranMedium">
          برای ورود به میلا فیلم رمز پروفایل را وارد کنید.
        </h3>
        <input
          type="password"
          dir="ltr"
          className="outline-none text-left  py-6  w-[300px] md:w-[512px] px-4 rounded-xl bg-gray-500/50 !mt-10"
        />
        <Button className="!bg-gray-500/50 hover:!bg-white/40 w-[200px] !mt-10">بازگشت</Button>
      </div>
    </div>
  );
}

export default PinLock;
