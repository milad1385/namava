"use client";
import React from "react";
import VerifyOtp from "./VerifyOtp";
import Register from "./Register";

function RegisterForm({ searchParams }: { searchParams: any }) {
  return (
    <div>
      {searchParams?.type === "verify" && (
        <>
          <VerifyOtp />
          <div className="flex-center flex-col text-xs md:text-sm text-namava space-y-6 !mt-8">
            <a href={"/register"}>شماره را اشتباه وارد کردید ؟</a>
          </div>
        </>
      )}
      {(!searchParams?.type) && <Register />}
    </div>
  );
}

export default RegisterForm;
