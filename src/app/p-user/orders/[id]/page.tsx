import Button from "@/src/components/modules/auth/Button/Button";
import React from "react";

function page() {
  return (
    <div className="bg-namavaBlack w-full px-[28] rounded-md py-6 md:w-1/2 mx-auto text-white">
      <h1 className="text-base md:text-lg font-IranMedium text-center">
        جزییات سفارش
      </h1>
      <ul className="w-full mt-5 space-y-4 border-b border-b-slate-500 pb-4">
        <li className="flex items-center justify-between">
          <span>شرح : </span>
          <span>یک ماهه</span>
        </li>
        <li className="flex items-center justify-between">
          <span>شماره سفارش : </span>
          <span>۱۴۰۳۰۵۰۴-۱۷۳۳-۲۹۳۷</span>
        </li>
        <li className="flex items-center justify-between">
          <span>زمان و ثبت سفارش : </span>
          <span>۱۴۰۳/۵/۴ ۰۷:۰۳:۵۶</span>
        </li>
        <li className="flex items-center justify-between">
          <span>وضعیت سفارش : </span>
          <span className="text-red-700">ناموفق</span>
        </li>
      </ul>
      <ul className="w-full mt-5 space-y-4">
        <li className="flex items-center justify-between">
          <span>قیمت : </span>
          <span>۱۶۰,۰۰۰ تومان</span>
        </li>
        <li className="flex items-center justify-between text-red-700">
          <span>جمع تخفیف : </span>
          <span>۱۶۰,۰۰۰ تومان</span>
        </li>
        <li className="flex items-center justify-between">
          <span>مالیات بر ارزش افزوده : </span>
          <span>۱۱,۲۰۰ تومان</span>
        </li>
        <li className="flex items-center justify-between text-namava">
          <span>مبلغ پرداختی : </span>
          <span>۱۲۳,۲۰۰ تومان</span>
        </li>

        <Button>بازگشت</Button>
      </ul>
    </div>
  );
}

export default page;
