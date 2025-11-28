"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Logo from "@/src/icons/Logo";
import { addNewProfile } from "@/src/libs/actions/profile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AddProfile() {
  const router = useRouter();
  return (
    <div className="text-white">
      <div className="flex items-center justify-center flex-col space-y-4">
        <Logo className="!w-[50px] md:!w-[80px] !h-[50px] md:!h-[80px]" />
        <h1 className="text-lg md:text-2xl text-center">افزودن پروفایل</h1>
      </div>
      <form
        action={async (formData) => {
          const res = await addNewProfile(formData);
          if (res.status === 201) {
            toast.success(res.message);
            router.push("/profile-list");
            return true;
          }
          toast.error(res.message);
        }}
        className="max-w-[700px] mx-auto"
      >
        <div className="flex items-center md:items-start gap-x-3 md:gap-x-8 px-4 md:px-10 py-6 md:py-[30px] bg-namavaBlack rounded-xl mt-10">
          <label
            htmlFor="image"
            className="relative flex-center md:group cursor-pointer w-[100px] md:w-[150px] h-[100px] md:h-[150px]"
          >
            <Image
              src="/images/user.svg"
              alt="user.svg"
              width={150}
              height={150}
              className="rounded-full"
            />
          </label>
          <div className="grow md:pt-4 space-y-5">
            <input
              type="text"
              placeholder="نام پروفایل"
              name="name"
              className="w-full text-sm md:text-base outline-none bg-gray-500/30 h-[52px] rounded-xl px-4 placeholder:text-white"
            />
            <label
              htmlFor="image"
              className="text-[#6eb8ff] block text-xs md:text-base font-IranMedium"
            >
              انتخاب تصویر
            </label>
            <input type="file" hidden name="image" id="image" />
            <div className="flex items-center gap-x-2">
              <input
                id={"kid"}
                type="checkbox"
                className="film-checkbox"
                name="isKid"
              />
              <label className="text-xs" htmlFor={"kid"}>
                پروفایل کودک
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-10 px-4 md:px-0">
          <Button type="submit">ذخیره</Button>
          <Button
            type="reset"
            onClick={() => router.back()}
            className="!bg-gray-500/40"
          >
            لغو
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProfile;
