import Button from "@/src/components/modules/auth/Button/Button";
import { checkUserSubscription } from "@/src/libs/service/services";
import { formatDate } from "@/src/utils/funcs";
import { authUser } from "@/src/utils/serverHelper";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { FaShop } from "react-icons/fa6";

export const metadata: Metadata = {
  title :"وضعیت اشتراک"
}


async function page() {
  const [user, subscription]: any = await Promise.all([
    authUser(),
    checkUserSubscription(),
  ]);
  return (
    <div className="bg-namavaBlack rounded-md p-6 text-white">
      <div className="flex items-center justify-between">
        <h1
          className={`text-xl ${
            subscription.hasSubscription ? "text-green-600" : "text-red-600"
          }`}
        >
          {subscription.hasSubscription
            ? "اطلاعات اشتراک فعال"
            : "اشتراک غیر فعال"}
        </h1>
      </div>
      <div className="mt-8">
        {subscription.hasSubscription ? (
          <ul className="space-y-5 text-base">
            <li>
              <span className="text-[#d4d4d4]">تاریخ فعال سازی : </span>
              <span>{formatDate(user.subscriptionStart)}</span>
            </li>
            <li>
              <span className="text-[#d4d4d4]">تاریخ اتمام : </span>
              <span>{formatDate(user.subscriptionEnd)}</span>
            </li>

            <li>
              <span className="text-[#d4d4d4]">
                تعداد روز های باقی مانده :{" "}
              </span>
              <span>{subscription.remainingDays.toLocaleString("fa-IR")} روز</span>
            </li>
            <li>
              <span className="text-[#d4d4d4]">خریدار : </span>
              <span>{user.name}</span>
            </li>
            <li>
              <span className="text-[#d4d4d4]">ایمیل : </span>
              <span>{user.email}</span>
            </li>
          </ul>
        ) : (
          <div className="flex-center flex-col gap-y-12 mt-16">
            <FaShop className="text-[50px] md:text-[100px]"/>
            <p>شما در حال حاضر اشتراک فعالی ندارید.</p>
            <Link href={"/plans"}>
              <Button className="!w-[200px]">خرید اشتراک</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
