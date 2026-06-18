import ChangePassword from "@/src/components/templates/auth/forgot/ChangePassword";
import SendPhone from "@/src/components/templates/auth/forgot/SendPhone";
import VerifyOtp from "@/src/components/templates/auth/forgot/VerifyOtp";
import Logo from "@/src/icons/Logo";
import Link from "next/link";
import React from "react";

export type ForgotProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

function ForgotPage({ searchParams }: ForgotProps) {
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
        {searchParams?.type === "verify" && (
          <>
            <VerifyOtp />
            <div className="flex-center flex-col text-xs md:text-sm text-milafilm space-y-6 !mt-8">
              <Link href={"?type=forgot"}>شماره را اشتباه وارد کردید ؟</Link>
            </div>
          </>
        )}
        {searchParams?.type === "finally" && <ChangePassword />}
        {(!searchParams?.type || searchParams?.type === "phone") && (
          <SendPhone />
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ searchParams }: ForgotProps) {
  const registerType =
    searchParams?.type === "verify"
      ? "کد یکبار مصرف"
      : searchParams?.type === "finally"
      ? "رمز عبور جدید"
      : "شماره همراه";

  return {
    title: `${registerType} را وارد کنید`,
  };
}

export default ForgotPage;
