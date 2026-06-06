import { authUser } from "@/src/utils/serverHelper";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title :"تنظیمات حساب کاربری"
}

async function page() {
  const user = await authUser();
  return (
    <div className="bg-namavaBlack p-8 w-full  rounded-md md:w-1/2 mx-auto text-white">
      <ul className="w-full text-sm space-y-6">
        {user.profiles.map((profile: any , index : number) => (
          <li className="flex items-center justify-between" key={profile._id}>
            <div className="flex items-center gap-x-3">
              <Image
                src={profile.image}
                alt={profile.name}
                width={1920}
                height={1080}
                className="w-[60px] h-[60px] rounded-full"
              />
              <span>
                {profile.name} <span className="text-[#aaa]">{index === 0 ? "(پیش فرض)" :""}</span>
              </span>
            </div>
            <Link href={`/profile-list-edit/${profile._id}`} className="text-namava">
              ویرایش پروفایل
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;
