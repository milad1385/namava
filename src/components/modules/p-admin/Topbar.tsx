import Logo from "@/src/icons/Logo";
import Link from "next/link";
import React from "react";
import { HiOutlineUser } from "react-icons/hi2";
import { RiMovie2Line } from "react-icons/ri";
import HambergerMenu from "./HambergerMenu";
import { authUser } from "@/src/utils/serverHelper";
import Logout from "./Logout";
import Image from "next/image";

async function TopBar() {
  const auth = await authUser();
  return (
    <div className="sticky z-10 top-0 border-b border-b-gray-700 bg-milafilmBlack py-[0.5rem] md:py-[0.8rem] px-[1.2rem] md:px-[2.5rem] flex items-center justify-between flex-row-reverse gap-x-6">
      <div className="hidden md:flex items-center gap-x-5">
        <Logout />
        <Link href="/">
          <HiOutlineUser className="text-milafilm text-2xl" />
        </Link>
      </div>
      <Link href="/" className="block md:hidden">
        <RiMovie2Line className="text-white text-3xl" />
      </Link>
      <div className="block md:hidden">
        <Logo className="w-[60px]" />
      </div>
      <div className="hidden md:flex items-center gap-x-4 text-gray-300">
        <Image
          src="/images/user.png"
          className="w-[36px] h-[36px] rounded-full"
          alt="default-user.jpg"
          width={1920}
          height={1080}
        />
        <div>
          <h2>{auth.name} ، خوش آمدید</h2>
          <h6 className="text-xs text-gray-400">مدیریت اصلی</h6>
        </div>
      </div>
      <HambergerMenu />
    </div>
  );
}

export default TopBar;
