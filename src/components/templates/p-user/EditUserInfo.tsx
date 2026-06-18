"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import SelectBox from "@/src/components/modules/p-admin/SelectBox";
import { generateFavriteGenres } from "@/public/db";
import { TUserAccount, UpdateUser, UserAccount } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaPhone } from "react-icons/fa6";

function EditUserInfo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TUserAccount>({
    resolver: zodResolver(UserAccount),
  });
  const updateUserAccount = async (data: TUserAccount) => {};
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
        name="genre"
        options={generateFavriteGenres()}
        title="ژانر مورد علاقه"
      />

      <Input
        type="password"
        placeholder="رمز عبور فعلی را وارد کنید"
        errors={errors}
        register={register}
        icon={<FaLock className={`text-lg md:text-2xl`} />}
        name="curPassword"
        title="رمز عبور"
      />
      <Input
        type="password"
        placeholder="رمز عبور جدید را وارد کنید"
        errors={errors}
        register={register}
        icon={<FaLock className={`text-lg md:text-2xl`} />}
        name="newPassword"
        title="رمز عبور جدید"
      />
      <div className="hidden md:block"></div>

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

export default EditUserInfo;
