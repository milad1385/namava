"use client";
import { profileLinks } from "@/public/db";
import useCloseOutSideClick from "@/src/hooks/useOutSideClick";
import ProfileArrow from "@/src/icons/ProfileArrow";
import { TProfileMenu } from "@/src/libs/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSettings } from "react-icons/lu";
import Button from "../auth/Button/Button";
import Logout from "./Logout";
import ProfileBox from "./ProfileBox";
import ProfileLink from "./ProfileLink";

function ProfileMenu({
  isShow,
  onShow,
  activeProfile,
  user,
  userSubscription,
}: TProfileMenu) {
  const [profileId, setProfileId] = useState("");
  const url = usePathname();

  const { ref } = useCloseOutSideClick(() => onShow(false), false);

  useEffect(() => {
    const id = document.cookie.split("=")[1];
    setProfileId(id);
  }, []);

  const profiles = user.profiles
    .slice(1, 3)
    .filter((profile: any) => profile._id !== profileId);

  return (
    <div
      ref={ref}
      className={`absolute profile-container rounded-[12px] ${
        isShow ? "opacity-100 visible" : "opacity-0 invisible"
      } w-[272px] -left-4 top-14`}
    >
      <div className="relative">
        <ProfileArrow />
      </div>
      <div>
        <div className="rounded-[12px] overflow-hidden">
          {/* profile header */}
          <div className="bg-[#D95C5C] p-4">
            <h1 className="text-center !text-white text-sm">
              {!userSubscription?.hasSubscription
                ? "اشتراک فعال ندارید"
                : `اشتراک باقی مانده :  ${userSubscription?.remainingDays.toLocaleString(
                    "fa-IR",
                  )} روز`}
            </h1>
            {!userSubscription?.hasSubscription && (
              <Link href={"/plans"}>
                <Button className="h-[32px] !text-xs text-black shadow-xl !font-Iran bg-white  hover:bg-namava hover:text-white mt-2">
                  خرید اشتراک
                </Button>
              </Link>
            )}
          </div>
          {/* profile body */}
          <div className="px-4 py-3 child:text-xs bg-white text-black">
            <div className="border-b border-b-gray-300 pb-2">
              <Link
                href={"/profile-list"}
                className="flex items-center justify-between hover:text-blue-600 group"
              >
                <div className="flex items-center gap-x-2">
                  <Image
                    src={activeProfile?.image ?? "/images/user.png"}
                    alt="user-profile"
                    width={30}
                    height={30}
                    priority={false}
                    className="rounded-full"
                  />
                  <span>{activeProfile?.name}</span>
                </div>
                <div className="flex items-center gap-x-1">
                  <LuSettings className="text-lg text-gray-600 group-hover:text-blue-600" />
                  <span>تنظیمات</span>
                </div>
              </Link>
            </div>
            {profiles?.length > 0 && (
              <div className="mt-2 space-y-3 border-b border-b-gray-300 pb-2">
                {profiles.map((profile: any) => (
                  <ProfileBox {...profile} key={profile._id} />
                ))}
              </div>
            )}
            <div className="space-y-4 mt-4 mb-2">
              {!url.includes("/kids") &&
                profileLinks.map((link) => (
                  <ProfileLink {...link} key={link.id} />
                ))}
              <Logout onShow={onShow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileMenu;
