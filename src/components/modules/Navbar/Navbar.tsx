"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "@/src/icons/Logo";
import Search from "@/src/icons/Search";
import Link from "next/link";
import Image from "next/image";
import { HiMiniBars3 } from "react-icons/hi2";
import MobileNavbar from "./MobileNavbar";
import { usePathname } from "next/navigation";
import KidLogo from "@/src/icons/KidLogo";
import Button from "../auth/Button/Button";
import ProfileMenu from "../profileMenu/ProfileMenu";
import { useAuth } from "@/src/context/AuthContextProvider";
import useCategoryName from "@/src/hooks/useCategoryName";
function Navbar({ user, userSubscription }: any) {
  const { activeProfile } = useAuth();
  const category: any = useCategoryName();

  const pathname = usePathname();
  const [isShowProfile, setIsShowProfile] = useState(false);
  let navBar = useRef<any>("");

  const isKid = pathname.includes("/kids");

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let lastScroll = 0;
    const scrollHandler = () => {
      if (navBar.current) {
        let newScroll = document.documentElement.scrollTop;

        if (navBar.current !== "") {
          if (newScroll === 0) {
            if (!isKid) {
              navBar.current.style.backgroundColor = "transparent";
            }
            navBar.current.position = "fixed";
            navBar.current.style.boxShadow = "none";
          } else if (newScroll > lastScroll) {
            navBar.current.style.top = "-100px";
            isKid
              ? (navBar.current.style.backgroundColor = "#fff")
              : (navBar.current.style.backgroundColor = "#121212");
            navBar.current.position = "fixed";
            navBar.current.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.3)";
          } else {
            navBar.current.style.top = "0px";
            navBar.current.position = "sticky";
            navBar.current.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.3)";
          }
        }
        lastScroll = newScroll;
      }
    };
    document.addEventListener("scroll", scrollHandler);

    return () => document.removeEventListener("scroll", scrollHandler);
  }, [pathname]);

  if (
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname.includes("/forgot") ||
    pathname.includes("/profile-list") ||
    pathname.includes("/add-profile") ||
    pathname.includes("/pin-lock") ||
    pathname.includes("/p-admin")
  ) {
    return null;
  }

  return (
    <>
      <div
        ref={navBar}
        className={`fixed  ${
          isKid ? "text-black py-5 md:py-1" : "navbar-container text-white"
        } ${
          isKid ? "bg-white" : ""
        } top-0  z-40  right-0  transition-all duration-500 left-0 py-2 px-[20px] lg:px-[43px] flex items-center justify-between`}
      >
        <div className="flex items-center md:gap-x-5 lg:gap-x-8">
          <div className="flex items-center gap-x-2">
            {!isKid && (
              <HiMiniBars3
                className="text-2xl block md:hidden"
                onClick={() => setIsOpen(true)}
              />
            )}
            <Link href={isKid ? "/kids" : "/"}>
              {isKid ? <KidLogo /> : <Logo />}
            </Link>
          </div>
          <ul className="hidden md:flex child:block items-center md:gap-x-5 lg:gap-x-8 text-xs hover:child:text-namava">
            {!isKid ? (
              <>
                <li>
                  <Link href={"/"} className={pathname === "/" ? "active" : ""}>
                    خانه
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/movie"}
                    className={pathname.includes("movie") ? "active" : ""}
                  >
                    فیلم ها
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/series"}
                    className={pathname.includes("series") ? "active" : ""}
                  >
                    سریال ها
                  </Link>
                </li>
                <li className={pathname.includes("category") ? "active" : ""}>
                  <Link href={"/category"}>
                    دسته بندی {category ? `(${category?.title ?? ""})` : ""}
                  </Link>
                </li>
                {user.role === "ADMIN" && (
                  <li>
                    <Link href={"/p-admin"}>پنل مدیریت</Link>
                  </li>
                )}
                <li>
                  <Link href={"/profile-list"}>کودکان</Link>
                </li>
                <li>
                  <Link
                    href={"/blog"}
                    className={pathname.includes("blog") ? "active" : ""}
                  >
                    نماوا مگ
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/about"}
                    className={pathname.includes("blog") ? "active" : ""}
                  >
                    درباره ما
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-sm">
                  <Link href={"/kids"}>خانه</Link>
                </li>
                <li className="text-sm">
                  <Link href={"/kids/bookmarks"}>لیست من</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-x-5">
          {isKid && (
            <Button className="!w-[120px] !hidden md:!block text-xs text-white !font-Iran">
              تنظیمات کودک
            </Button>
          )}
          <Link href={isKid ? "/kids/search" : "/search"}>
            <Search className={isKid ? "fill-gray-600" : "fill-white"} />
          </Link>
          {user ? (
            <div className="relative">
              <Link href={""} onMouseEnter={() => setIsShowProfile(true)}>
                <Image
                  src={activeProfile?.image ?? "/images/user.png"}
                  alt={"userprofile"}
                  width={40}
                  height={40}
                  priority
                  className="rounded-full w-[30px] h-[30px] lg:w-10 lg:h-10 shrink-0"
                />
              </Link>
              <ProfileMenu
                isShow={isShowProfile}
                onShow={setIsShowProfile}
                user={user}
                userSubscription={userSubscription}
                activeProfile={activeProfile}
              />
            </div>
          ) : (
            <Link href={"/plans"} className="text-xs">
              خرید اشتراک
            </Link>
          )}
          {!isKid && !user && (
            <Link
              href={"/login"}
              className={`bg-transparent  ${
                isKid ? "" : "border border-white"
              }  rounded-xl text-xs py-2.5 px-2`}
            >
              ورود | ثبت نام
            </Link>
          )}
        </div>
      </div>
      {/* mobile menu */}
      {!isKid && (
        <MobileNavbar user={user} isOpen={isOpen} onOpen={setIsOpen} />
      )}
    </>
  );
}

export default Navbar;
