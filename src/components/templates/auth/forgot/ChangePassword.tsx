"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/auth/Input/Input";
import Label from "@/src/components/modules/auth/Label/Label";
import Desc from "@/src/components/modules/auth/desc/desc";
import Spinner from "@/src/components/modules/spinner/Spinner";
import Remember from "@/src/icons/Remember";
import { PasswordFormData, passwordSchema } from "@/src/validators/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

function ChangePassword({ token }: { token: string }) {
  const [isShowPass, setIsShowPassord] = useState(true);
  const [isShowConfirmPass, setIsShowConfirmPassord] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    trigger,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const resetPasswordHandler = async (data: PasswordFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/forgot/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          newPassword: data.password,
        }),
      });

      const result = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        toast.error("خطا در تغییر رمز عبور");
      }

      toast.success("رمز عبور با موفقیت تغییر کرد");
      return router.replace("/login");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleFieldChange = (field: keyof PasswordFormData, value: string) => {
    setValue(field, value);
    trigger(field);
  };

  return (
    <>
      <div className="flex items-center gap-x-4 mt-5">
        <Remember />
        <span className="text-white text-sm md:text-base">
          بازیابی رمز عبور
        </span>
      </div>
      <Desc title="لطفا اطلاعات زیر را تکمیل کنید" />
      <form
        onSubmit={handleSubmit(resetPasswordHandler)}
        className="space-y-[24px]"
      >
        <div className="flex flex-col gap-y-6 relative">
          <Label title="رمز عبور جدید" />
          <div
            className={`bg-[#121212] rounded-xl flex items-center justify-between`}
          >
            <Input
              type={isShowPass ? "password" : "text"}
              value={password || ""}
              onChange={(e) => handleFieldChange("password", e.target.value)}
              dir={password ? "ltr" : "rtl"}
              disabled={isLoading}
              placeholder="رمز عبور جدید را وارد کنید."
              className={password ? "text-left" : "text-right"}
            />
            <button
              type="button"
              onClick={() => setIsShowPassord(!isShowPass)}
              className="ml-4 focus:outline-none"
            >
              {isShowPass ? (
                <FiEyeOff className="text-xl text-gray-400 hover:text-white transition-colors" />
              ) : (
                <FiEye className="text-xl text-gray-400 hover:text-white transition-colors" />
              )}
            </button>
          </div>
          {errors?.password && (
            <span className="absolute -bottom-6 text-xs md:text-sm text-red-500 mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-3 relative">
          <Label title="تکرار رمز عبور" />
          <div
            className={`bg-[#121212] rounded-xl flex items-center justify-between`}
          >
            <Input
              type={isShowConfirmPass ? "password" : "text"}
              value={confirmPassword || ""}
              disabled={isLoading}
              onChange={(e) =>
                handleFieldChange("confirmPassword", e.target.value)
              }
              dir={confirmPassword ? "ltr" : "rtl"}
              placeholder="تکرار رمز عبور را وارد کنید."
              className={confirmPassword ? "text-left" : "text-right"}
            />
            <button
              type="button"
              onClick={() => setIsShowConfirmPassord(!isShowConfirmPass)}
              className="ml-4 focus:outline-none"
            >
              {isShowConfirmPass ? (
                <FiEyeOff className="text-xl text-gray-400 hover:text-white transition-colors" />
              ) : (
                <FiEye className="text-xl text-gray-400 hover:text-white transition-colors" />
              )}
            </button>
          </div>
          {errors?.confirmPassword && (
            <span className="absolute -bottom-6 text-xs md:text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button className="!h-[50px] !mt-10" disabled={isLoading}>
          {isLoading ? <Spinner /> : "ارسال رمز عبور"}
        </Button>
      </form>
    </>
  );
}

export default ChangePassword;
