"use client";
import React from "react";
import VerifyOtp from "./VerifyOtp";
import Register from "./Register";

function RegisterForm({ type }: { type: string }) {
  return (
    <div>
      {type === "verify" && (
        <>
          <VerifyOtp />
          <div className="flex-center flex-col text-xs md:text-sm text-namava space-y-6 !mt-8">
            <a href={"/register"}>شماره را اشتباه وارد کردید ؟</a>
          </div>
        </>
      )}
      {!type && <Register />}
    </div>
  );
}

export default RegisterForm;
