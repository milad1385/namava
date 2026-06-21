import ChangePassword from "@/src/components/templates/auth/forgot/ChangePassword";

import Logo from "@/src/icons/Logo";
import { verifyResetToken } from "@/src/libs/mailer";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export type TResetPassword = {
  searchParams?: { [key: string]: string | string[] | undefined };
  params?: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: "ایجاد رمز جدید",
};

function ResetPassword({ params }: TResetPassword) {
  const { token } = params;
  const decoded = verifyResetToken(token as string);

  if (!decoded) {
    redirect("/forgot?error=invalid-token");
  }
  return (
    <div className="bg-milafilmBlack md:bg-[#121212] flex items-center justify-center min-h-screen text-white">
      <div className="login-form relative  md:shadow w-[500px] max-h-[641px] bg-milafilmBlack px-[40px] md:px-[60px] py-[20px] md:py-[30px] rounded-lg">
        <Logo className="fill-milafilm !w-[96px] !h-[61px] mx-auto" />
        <Link
          href={"/login"}
          className="text-milafilm absolute left-10 md:left-20 top-10 md:top-12"
        >
          ورود
        </Link>
        <ChangePassword token={token as string} />
      </div>
    </div>
  );
}

export default ResetPassword;
