"use client";
import React from "react";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import { TUpdateUser, UpdateUser } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaInfo, FaUser } from "react-icons/fa6";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import { day, generateMonth, year } from "@/public/db";

function EditUser() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TUpdateUser>({
    resolver: zodResolver(UpdateUser),
  });

  const updateUserInfo = async (data: TUpdateUser) => {

  };

  const fakeOptions = [
    { id: 1, label: "البرز", value: "alborz" },
    { id: 2, label: "تهران", value: "tehran" },
    { id: 3, label: "گیلان", value: "gilan" },
  ];

  return (
    <form
      onSubmit={handleSubmit(updateUserInfo)}
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
        name="bio"
        title="بیوگرافی خلاصه"
      />

      <SelectBox
        register={register}
        errors={errors}
        name="province"
        options={fakeOptions}
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
        <Button type="submit" className={`${isValid ? "" : "!bg-slate-600 "}`}>
          ویرایش کردن
        </Button>
        <Button className="bg-red-700" onClick={() => reset()}>
          لغو
        </Button>
      </div>
    </form>
  );
}

export default EditUser;
