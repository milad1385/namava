import ChangePassword from "@/src/components/templates/auth/forgot/ChangePassword";
import SendEmail from "@/src/components/templates/auth/forgot/SendEmail";
import VerifyOtp from "@/src/components/templates/auth/forgot/VerifyOtp";
import Logo from "@/src/icons/Logo";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export type ForgotProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: "فراموشی رمز ، ارسال درخواست",
};

function ForgotPage() {
  return (
    <div className="bg-milafilmBlack md:bg-[#121212] flex items-center justify-center min-h-screen text-white">
      <div className="login-form relative  md:shadow w-[500px] max-h-[641px] bg-milafilmBlack px-[40px] md:px-[60px] py-[20px] md:py-[30px] rounded-lg">
        <Logo className="fill-milafilm !w-[96px] !h-[61px] mx-auto" />
        <Link
          href={"/register"}
          className="text-milafilm absolute left-10 md:left-20 top-10 md:top-12"
        >
          ثبت نام
        </Link>
        <SendEmail />
      </div>
    </div>
  );
}

export default ForgotPage;
