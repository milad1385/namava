
import LoginForm from "@/src/components/templates/auth/Login/LoginForm";
import SendOtpCode from "@/src/components/templates/auth/Login/OtpLogin";
import VerifyOtp from "@/src/components/templates/auth/Login/VerifyOtp";
import Logo from "@/src/icons/Logo";
import Link from "next/link";
import React from "react";

export type LoginProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

function Login({ searchParams }: LoginProps) {
  return (
    <div className="bg-namavaBlack md:bg-[#121212] flex-center min-h-screen text-white">
      <div className="login-form relative  md:shadow w-[500px] max-h-[641px] bg-namavaBlack px-[40px] md:px-[60px] py-[20px] md:py-[30px] rounded-lg">
        <Logo className="fill-namava !w-[96px] !h-[61px] mx-auto" />
        <Link
          href={"/register"}
          className="text-namava absolute left-10 md:left-20 top-10 md:top-12"
        >
          ثبت نام
        </Link>
        {searchParams?.type === "verify" && <VerifyOtp />}
        {searchParams?.type === "otp" && <SendOtpCode />}
        {(!searchParams?.type ) && (
          <LoginForm />
        )}

        {searchParams?.type !== "verify" && (
          <div className="flex-center flex-col text-xs md:text-sm text-namava space-y-6 !mt-8">
            {searchParams?.type !== "otp" && (
              <Link href={"?type=forgot"}>رمز عبور خود را فراموش کرده ام.</Link>
            )}
            <div className="flex items-center gap-x-6">
              <Link
                href={"?type=otp"}
                className={searchParams?.type === "otp" ? "text-white" : ""}
              >
                ورود با کد یکبار مصرف
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ searchParams }: LoginProps) {
  const loginType =
    searchParams?.type === "otp"
      ? "کد یکبار مصرف"
      :"اطلاعات هویتی"

  return {
    title: `ورود از طریق ${loginType}`,
  };
}

export default Login;
