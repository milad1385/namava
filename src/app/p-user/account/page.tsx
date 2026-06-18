import { checkUserSubscription } from "@/src/libs/service/services";
import { formatDate } from "@/src/utils/funcs";
import { authUser } from "@/src/utils/serverHelper";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

async function page() {
  const [user, subscription]: any = await Promise.all([
    authUser(),
    checkUserSubscription(),
  ]);

  return (
    <>
      <div className="bg-milafilmBlack rounded-md p-6 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">اطلاعات شخصی</h1>
          <Link href={"account/information"} className="text-milafilm">
            ویرایش اطلاعات
          </Link>
        </div>
        <div className="mt-8">
          <ul className="space-y-5 text-base">
            <li>
              <span className="text-[#d4d4d4]">نام : </span>
              <span>{user.name.split(" ")[0]}</span>
            </li>
            <li>
              <span className="text-[#d4d4d4]">نام خانوادگی : </span>
              <span>{user.name.split(" ")[1]}</span>
            </li>

            <li>
              <span className="text-[#d4d4d4]">نام کاربری : </span>
              <span>{user.username}</span>
            </li>
            <li>
              <span className="text-[#d4d4d4]">اشتراک : </span>
              <span>
                {subscription.hasSubscription
                  ? `${subscription.remainingDays} روز`
                  : "فعال نیست"}
              </span>
            </li>
            <li>
              <span className="text-[#d4d4d4]">تاریخ تولد : </span>
              <span>1385/03/19 </span>
            </li>
            <li>
              <span className="text-[#d4d4d4]">استان : </span>
              <span>کرج</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-milafilmBlack rounded-md p-6 text-white mt-5 ">
        <div className="flex items-center justify-between">
          <h1 className="text-xl">اطلاعات کاربری</h1>
          <Link href={"account/information"} className="text-milafilm">
            ویرایش اطلاعات کاربری
          </Link>
        </div>
        <div className="mt-8">
          <ul className="space-y-5 text-base">
            <li>
              <span className="text-[#d4d4d4]">شماره تلفن : </span>
              <span className="font-Dana">{user.phone}</span>
            </li>
            <li>
              <div>
                <span className="text-[#d4d4d4]">ایمیل : </span>
                <span>{user.email}</span>
              </div>
            </li>

            <li>
              <span className="text-[#d4d4d4]">تعداد پروفایل : </span>
              <span>{user.profiles.length} تا </span>
            </li>
            <li>
              <span className="text-[#d4d4d4]">تاریخ عضویت : </span>
              <span>{formatDate(user.createdAt)}</span>
            </li>
            <li>
              <span className="text-[#d4d4d4]">ژانر مورد علاقه : </span>
              <span>اکشن و ماجراجویی</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const user = await authUser();
  return {
    title: `اطلاعات ${user.name}`,
    description: `در این صفحه میتوانید اطلاعات خودتان (${user.name}) را مشاهده کنید`,
  };
}

export default page;
