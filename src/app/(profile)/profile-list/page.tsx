import Button from "@/src/components/modules/auth/Button/Button";
import ProfileBox from "@/src/components/modules/profileBox/ProfileBox";
import Logo from "@/src/icons/Logo";
import Plus from "@/src/icons/Plus";
import { authUser } from "@/src/utils/serverHelper";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

export const metadata: Metadata = {
  title: "لیست پروفایل های شما",
  description: `از این صفحه برای مشاهده پروفایل ها میتوانید استفاده کنید`,
  keywords: "پروفایل ، لیست ، مدیریت",
};

async function ProfileList() {
  const user = await authUser();

  return (
    <div className="text-white">
      <div className="flex items-center justify-center relative">
        <Logo className="!w-[50px] md:!w-[80px] !h-[50px] md:!h-[80px]" />
        <div className="absolute left-5 text-sm  md:left-10 flex items-center gap-x-2">
          <FaInfoCircle />
          <span>بیشتر بدانید</span>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col mt-10 md:mt-24">
        <h1 className="text-xl md:text-3xl">چه کسی تماشا می‌کند؟</h1>
        <div className="flex-center  flex-wrap gap-y-8 gap-x-10 mt-10 md:mt-20 child:md:cursor-pointer">
          {user?.profiles?.map((profile: any) => (
            <ProfileBox
              profile={JSON.parse(JSON.stringify(profile))}
              key={profile._id}
            />
          ))}
          <Link href={"/add-profile"}>
            <div className="flex items-center justify-center bg-gray-500/40 rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
              <Plus className="w-[35px] md:w-[60px] h-[35px] md:h-[60px]" />
            </div>
            <h2 className="text-center mt-3">افزودن پروفایل</h2>
          </Link>
        </div>
        <Button className="!w-[200px] mt-20 flex items-center justify-center gap-x-2 bg-gray-500/40">
          <IoMdSettings className="text-xl" />
          <Link href={"/profile-list-edit"} className="text-xs">
            تنظیمات پروفایل
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ProfileList;
