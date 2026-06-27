"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import { editUserInfoWithFavGenre } from "@/src/libs/actions/user";
import { IUpdateUserWithFavGenre } from "@/src/libs/types";
import { TUserAccount, UserAccount } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import Spinner from "../../modules/spinner/Spinner";

function EditUserInfo({ user, subCategories }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TUserAccount>({
    resolver: zodResolver(UserAccount),
    defaultValues: {
      phone: user?.phone,
      email: user?.email,
      favGenre: user?.favGenre,
    },
  });
  const updateUserAccount = async (data: TUserAccount) => {
    const userData: IUpdateUserWithFavGenre = {
      email: data?.email || user?.email,
      favGenre: data?.favGenre || user?.favGenre,
      phone: data?.phone || user?.phone,
    };
    setIsLoading(true);
    const res = await editUserInfoWithFavGenre(userData);
    setIsLoading(false);
    if (res.status === 200) {
      toast.success(res?.message);
      router.refresh();
    } else {
      toast.error(res?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(updateUserAccount)}
      className="bg-milafilmBlack rounded-lg p-6 shadow grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
    >
      <Input
        type="text"
        placeholder="شماره تلفن کاربر را وارد کنید"
        errors={errors}
        register={register}
        icon={<FaPhone className={`text-lg md:text-2xl`} />}
        name="phone"
        title="شماره تلفن"
      />

      <Input
        type="email"
        placeholder="ایمیل کاربر را وارد کنید"
        errors={errors}
        register={register}
        icon={<FaEnvelope className={`text-lg md:text-2xl`} />}
        name="email"
        title="ایمیل"
      />

      <SelectBox
        register={register}
        errors={errors}
        name="favGenre"
        options={subCategories}
        title="ژانر مورد علاقه"
      />

      <div className="hidden md:block"></div>

      <div className="flex items-center gap-x-3 md:gap-x-8 mt-5 text-white">
        <Button
          type="submit"
          disabled={isLoading}
          className={`${isValid ? "" : "!bg-slate-600 "} h-[46px]`}
        >
          {isLoading ? <Spinner /> : " ویرایش کردن"}
        </Button>
        <Button className="bg-red-700" onClick={() => reset()}>
          لغو
        </Button>
      </div>
    </form>
  );
}

export default EditUserInfo;
