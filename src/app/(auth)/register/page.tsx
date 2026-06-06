
import RegisterForm from "@/src/components/templates/auth/register/RegisterForm";
import Logo from "@/src/icons/Logo";
import Link from "next/link";
import React from "react";

export type ResgisterProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

function RegisterPage({ searchParams }: ResgisterProps) {
  return (
    <div className="bg-namavaBlack md:bg-[#121212] flex-center min-h-screen text-white py-10">
      <div className="login-form relative  md:shadow w-[500px]  bg-namavaBlack px-[40px] md:px-[60px] py-[20px] md:py-[30px] rounded-lg">
        <Logo className="fill-namava !w-[96px] !h-[61px] mx-auto" />
        <Link
          href={"/login"}
          className="text-namava absolute left-10 md:left-20 top-10 md:top-12"
        >
          ورود
        </Link>
        <RegisterForm searchParams={searchParams} />
      </div>
    </div>
  );
}

export async function generateMetadata({ searchParams }: ResgisterProps) {
  const registerType =
    searchParams?.type === "verify"
      ? "کد یکبار مصرف"
      : "ثبت نام کاربر"
  return {
    title: `${registerType}`,
  };
}

export default RegisterPage;
