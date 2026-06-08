"use client";
import { useAuth } from "@/src/context/AuthContextProvider";
import useCategoryName from "@/src/hooks/useCategoryName";
import KidLogo from "@/src/icons/KidLogo";
import Logo from "@/src/icons/Logo";
import Search from "@/src/icons/Search";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiMiniBars3 } from "react-icons/hi2";
import Button from "../auth/Button/Button";
import ProfileMenu from "../profileMenu/ProfileMenu";
import MobileNavbar from "./MobileNavbar";
import { limitedRoute } from "@/public/db";
import Menus from "./Menus";
function Navbar({ user, userSubscription, menus }: any) {
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

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [pathname]);

  const result = limitedRoute.some((route) => pathname.includes(route));
  if (result) {
    return null;
  }

  return (
    <>
      <div
        ref={navBar}
        className={`fixed  ${
          isKid
            ? `text-black ${isKid ? "" : "py-10"}  md:py-1`
            : "navbar-container text-white"
        } ${
          isKid ? "bg-white" : ""
        } top-0  z-40  right-0  transition-all duration-500 left-0  px-[20px] lg:px-[43px] flex items-center justify-between`}
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
              <Menus menus={menus} category={category} user={user} />
            ) : (
              <>
                <li className="text-sm">
                  <Link href={"/kids"}>خانه</Link>
                </li>

                {user ? (
                  <Link href="/kids/bookmarks" className="text-sm">
                    لیست من
                  </Link>
                ) : (
                  <Link href="/login" className="text-sm">
                    ورود
                  </Link>
                )}
                <Link href="/kids/search" className="text-sm">
                  جستجو کردن
                </Link>
              </>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-x-5">
          {isKid && user && (
            <Link href={`/profile-list-edit/${activeProfile?._id}`}>
              <Button className="!w-[120px] !hidden md:!block text-xs text-white !font-Iran">
                تنظیمات کودک
              </Button>
            </Link>
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
