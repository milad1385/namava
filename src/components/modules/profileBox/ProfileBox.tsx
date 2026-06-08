"use client";
import { checkUserProfilePassword } from "@/src/libs/actions/profile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LockModal from "../modals/LockModal";

function ProfileBox({ profile }: any) {
  const [isShowLockModal, setIsShowLockModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNavigation = async () => {
    if (profile.isLock) {
      setIsShowLockModal(true);
    } else {
      document.cookie = `profile = ${profile._id}; path=/`;
      if (profile.type === "kid") {
        router.push("/kids");
      } else {
        router.push("/");
      }
    }
  };

  const sendProfilePassword = async () => {
    setIsLoading(true);
    const res = await checkUserProfilePassword(profile._id, password);
    if (res?.status === 200) {
      setIsLoading(false);
      document.cookie = `profile = ${profile._id}; path=/`;
      router.push("/");
      return toast.success(`${res?.message}`);
    }
    return toast.error(`${res?.message}`);
  };
  return (
    <>
      <div onClick={handleNavigation}>
        <Image
          src={profile.image}
          width={1920}
          height={1080}
          alt={profile.image}
          className="rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
        />
        <h2 className="text-center mt-3 text-sm md:text-base">{profile.name}</h2>
      </div>

      {isShowLockModal && (
        <LockModal
          password={password}
          onPassword={setPassword}
          onClose={setIsShowLockModal}
          isShow={isShowLockModal}
          title="رمز عبور پروفایل را وارد نمایید"
          desc="این رمز عبور ، همان رمز عبوری است که قبلا وارد کردید"
          onAction={sendProfilePassword}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default ProfileBox;
