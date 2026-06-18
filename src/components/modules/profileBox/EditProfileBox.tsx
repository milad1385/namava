"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import LockModal from "../modals/LockModal";
import { checkUserProfilePassword } from "@/src/libs/actions/profile";
import toast from "react-hot-toast";

function EditProfileBox({ profile }: any) {
  const [isShowLockModal, setIsShowLockModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleNavigation = async () => {
    if (profile.isLock) {
      setIsShowLockModal(true);
    } else {
      router.push(`/profile-list-edit/${profile._id}`);
    }
  };

  const sendProfilePassword = async () => {
    setIsLoading(true);
    const res = await checkUserProfilePassword(profile._id, password);
    if (res?.status === 200) {
      setIsLoading(false);
      router.push(`/profile-list-edit/${profile._id}`);
      return toast.success(`${res?.message}`);
    }
    setIsLoading(false);
    setIsShowLockModal(false);
    return toast.error(`${res?.message}`);
  };
  return (
    <>
      <div onClick={handleNavigation}>
        <div className="relative flex-center">
          <Image
            src={profile.image}
            width={150}
            height={150}
            alt={profile.name}
            className="rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
          />
          <div className="absolute  bg-black/50 inset-0 rounded-full flex-center">
            <FaPencil className="text-3xl" />
          </div>
          {profile.password && (
            <div className="absolute -right-1 bottom-0 w-10 h-10 bg-milafilmBlack rounded-full flex-center">
              <IoIosLock className="text-xl" />
            </div>
          )}
        </div>
        <h2 className="text-center mt-3">{profile.name}</h2>
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

export default EditProfileBox;
