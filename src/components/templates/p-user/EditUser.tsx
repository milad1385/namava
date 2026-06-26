"use client";
import React, { useState } from "react";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import { TUpdateUser, UpdateUser } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaInfo, FaUser } from "react-icons/fa6";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import { day, generateMonth, provineData, year } from "@/public/db";
import { IUpdateUser } from "@/src/libs/types";
import { updateUserInfo } from "@/src/libs/actions/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "../../modules/spinner/Spinner";

function EditUser({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TUpdateUser>({
    resolver: zodResolver(UpdateUser),
    defaultValues: {
      name: user?.name,
      biography: user?.biography,
      birthDay: user?.birthday?.split("-")[2] || "",
      birthMouth: user?.birthday?.split("-")[1] || "",
      birthYear: user?.birthday?.split("-")[0] || "",
      province: user?.province || "",
    },
  });

  const updateUserHandler = async (data: TUpdateUser) => {
    const birthday = `${data?.birthYear}-${data?.birthMouth}-${data?.birthDay}`;
    const userData: IUpdateUser = {
      name: data?.name || user?.name,
      province: data?.province || user?.province,
      biography: data?.biography || user?.province,
      birthday: birthday || user?.birthDay,
    };
    setIsLoading(true);
    const res = await updateUserInfo(userData);
    setIsLoading(false);
    if (res.status === 200) {
      toast.success("اطلاعات شما با موفقیت آپدیت شد");
      router.refresh();
    } else {
      toast.error(`${res?.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateUserHandler)}
      className="bg-milafilmBlack rounded-lg p-6 shadow grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-6"
    >
      <Input
        type="text"
        placeholder="نام و نام خانوادگی جدید را وارد کنید"
        errors={errors}
        icon={<FaUser className={`text-xl`} />}
        register={register}
        name="name"
        title="نام و نام خانوادگی"
      />

      <Input
        type="text"
        placeholder="درباره خود بنویسید "
        errors={errors}
        register={register}
        icon={<FaInfo className={`text-xl`} />}
        name="biography"
        title="بیوگرافی خلاصه"
      />

      <SelectBox
        register={register}
        errors={errors}
        name="province"
        options={provineData}
        title="استان (اختیاری)"
      />

      <div className="flex items-center gap-x-3 w-full">
        <SelectBox
          register={register}
          errors={errors}
          name="birthDay"
          options={day}
          title="تاریخ تولد"
          dateName="روز"
        />
        <SelectBox
          register={register}
          errors={errors}
          name="birthMouth"
          options={generateMonth()}
          title=" "
          dateName="ماه"
        />{" "}
        <SelectBox
          register={register}
          errors={errors}
          name="birthYear"
          options={year}
          title=" "
          dateName="سال"
        />
      </div>

      <div className="flex items-center gap-x-3 md:gap-x-8 mt-5 text-white">
        <Button
          type="submit"
          disabled={isLoading}
          className={`${isValid ? "" : "!bg-slate-600 "} h-[46px]`}
        >
          {isLoading ? <Spinner /> : " ویرایش کردن"}
        </Button>
        <Button className="bg-red-700 h-[46px]" onClick={() => reset()}>
          لغو
        </Button>
      </div>
    </form>
  );
}

export default EditUser;
