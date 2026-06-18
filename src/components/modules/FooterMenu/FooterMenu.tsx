"use client";
import Link from "next/link";
import React from "react";
import More from "@/src/icons/More";
import Folder from "@/src/icons/Folder";
import Category from "@/src/icons/Category";
import Magni from "@/src/icons/Magni";
import Home from "@/src/icons/Home";
import { usePathname } from "next/navigation";

function FooterMenu() {
  const pathname = usePathname();
  const isKid = pathname.includes("/kids");
  if (
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/profile-list") ||
    pathname.includes("/add-profile") ||
    pathname.includes("/pin-lock") ||
    pathname.includes("/p-admin") ||
    pathname.includes("/kids")
  ) {
    return null;
  }
  

  return (
    <div
      className={`block md:hidden sticky bottom-0 h-[60px] left-0 right-0 px-4 py-2 z-30 footer-menu ${
        isKid ? "bg-white text-black" : "bg-milafilmBlack text-white"
      }`}
    >
      <ul className="flex items-center justify-between  ">
        <li>
          <Link
            href="/"
            className={`flex items-center flex-col text-lg relative`}
          >
            <Home fill={`${isKid ? "#6d6c6c" : "#aaa"}`} />
            <span className={`block text-[10px] mb-2 absolute -bottom-8`}>
              خانه
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className="flex items-center flex-col text-lg relative "
          >
            <Magni fill={isKid ? "#6d6c6c" : "#aaa"} />
            <span className="block text-[10px] mb-2 text-gray-400 absolute -bottom-8">
              جستجو
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/category"
            className="flex items-center flex-col text-lg relative "
          >
            <Category fill={isKid ? "#6d6c6c" : "#aaa"} />
            <span className="block text-[10px] mb-2 text-gray-400 absolute -bottom-8 w-[50px]">
              دسته بندی
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/bookmarks"
            className="flex items-center flex-col text-lg relative "
          >
            <Folder fill={isKid ? "#6d6c6c" : "#aaa"} />
            <span className="block text-[10px] w-[40px] mb-2 text-gray-400 absolute -bottom-8">
              لیست من
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/p-user"
            className="flex items-center flex-col text-lg relative "
          >
            <More fill={isKid ? "#6d6c6c" : "#aaa"} />
            <span className="block text-[10px] mb-2 text-gray-400 absolute -bottom-8">
              بیشتر
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FooterMenu;
