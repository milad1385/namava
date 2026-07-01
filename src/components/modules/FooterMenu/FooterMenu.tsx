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
  
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  if (
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/reset-password") ||
    pathname.includes("/forgot") ||
    pathname.includes("/profile-list") ||
    pathname.includes("/add-profile") ||
    pathname.includes("/pin-lock") ||
    pathname.includes("/p-admin") ||
    pathname.includes("/kids")
  ) {
    return null;
  }

  const activeColor = "#1993ff"; 
  const inactiveColor = isKid ? "#6d6c6c" : "#aaa";

  return (
    <div
      className={`block md:hidden sticky bottom-0 h-[60px] left-0 right-0 px-4 py-2 z-30 footer-menu ${
        isKid ? "bg-white text-black" : "bg-milafilmBlack text-white"
      }`}
    >
      <ul className="flex items-center justify-between">
        <li>
          <Link
            href="/"
            className="flex items-center flex-col text-lg relative"
          >
            <Home fill={isActive("/") ? activeColor : inactiveColor} />
            <span
              className={`block text-[10px] mb-2 absolute -bottom-8 ${
                isActive("/") ? "text-milafilm" : isKid ? "text-gray-500" : "text-gray-400"
              }`}
            >
              خانه
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className="flex items-center flex-col text-lg relative"
          >
            <Magni fill={isActive("/search") ? activeColor : inactiveColor} />
            <span
              className={`block text-[10px] mb-2 absolute -bottom-8 ${
                isActive("/search") ? "text-milafilm" : "text-gray-400"
              }`}
            >
              جستجو
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/category"
            className="flex items-center flex-col text-lg relative"
          >
            <Category fill={isActive("/category") ? activeColor : inactiveColor} />
            <span
              className={`block text-[10px] mb-2 absolute -bottom-8 w-[50px] ${
                isActive("/category") ? "text-milafilm" : "text-gray-400"
              }`}
            >
              دسته بندی
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/bookmarks"
            className="flex items-center flex-col text-lg relative"
          >
            <Folder fill={isActive("/bookmarks") ? activeColor : inactiveColor} />
            <span
              className={`block text-[10px] w-[40px] mb-2 absolute -bottom-8 ${
                isActive("/bookmarks") ? "text-milafilm" : "text-gray-400"
              }`}
            >
              لیست من
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/p-user"
            className="flex items-center flex-col text-lg relative"
          >
            <More fill={isActive("/p-user") ? activeColor : inactiveColor} />
            <span
              className={`block text-[10px] mb-2 absolute -bottom-8 ${
                isActive("/p-user") ? "text-milafilm" : "text-gray-400"
              }`}
            >
              بیشتر
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default FooterMenu;