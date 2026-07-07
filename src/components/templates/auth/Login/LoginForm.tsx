"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/p-admin/Input";
import Desc from "@/src/components/modules/auth/desc/desc";
import Mobile from "@/src/icons/Mobile";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login, TLogin } from "@/src/validators/frontend";
import { AiOutlineProduct } from "react-icons/ai";
import { signIn } from "@/src/libs/actions/auth";
import toast from "react-hot-toast";
import Spinner from "@/src/components/modules/spinner/Spinner";

function LoginForm() {
  const [isPassword, setIsPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TLogin>({ resolver: zodResolver(Login) });

  const loginHandler = async (data: TLogin) => {
    setIsLoading(true);
    const res = await signIn(data);
    setIsLoading(false);
    if (res?.status === 200) {
      toast.success(`${res.message}`);
      window.location.replace("/");
      // return router.replace("/");
    }

    toast.error(`${res.message}`);
  };
  return (
    <>
      <div className="flex items-center gap-x-4 mt-5">
        <Mobile />
        <span className="text-white text-sm md:text-base">
          ورود از طریق شماره تلفن یا ایمیل
        </span>
      </div>
      <Desc title="کاربر گرامی ، لطفا اطلاعات خود را با دقت وارد نمایید" />

      <form onSubmit={handleSubmit(loginHandler)} className="space-y-[24px]">
        <Input
          register={register}
          errors={errors}
          name="identifier"
          title="تلفن / ایمیل / نام کاربری"
          type="text"
          icon={<AiOutlineProduct className="text-lg md:text-2xl" />}
          placeholder="اطلاعات خواسته شده را وارد کنید"
          labelClassName="!text-[17px]"
        />

        <Input
          register={register}
          errors={errors}
          name="password"
          title="رمز عبور"
          type={isPassword ? "password" : "text"}
          icon={
            isPassword ? (
              <FiEyeOff
                onClick={() => setIsPassword(false)}
                className="text-lg md:text-xl"
              />
            ) : (
              <FiEye
                onClick={() => setIsPassword(true)}
                className="text-lg md:text-xl"
              />
            )
          }
          placeholder="لطفا رمز عبور خود را وارد کنید"
          labelClassName="!text-[17px]"
        />
        <Button
          disabled={isLoading}
          className={`h-[44px] ${
            isValid && !isLoading ? "!bg-milafilm" : "bg-slate-500"
          }`}
          type="submit"
        >
          {isLoading ? <Spinner /> : " ورود"}
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
