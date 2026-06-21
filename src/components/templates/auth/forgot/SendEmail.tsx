"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Input from "@/src/components/modules/auth/Input/Input";
import Label from "@/src/components/modules/auth/Label/Label";
import Desc from "@/src/components/modules/auth/desc/desc";
import MiniSpinner from "@/src/components/modules/spinner/MiniSpinner";
import Spinner from "@/src/components/modules/spinner/Spinner";
import Remember from "@/src/icons/Remember";
import { sendResetPasswordEmail } from "@/src/libs/actions/auth";
import { useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { FaEnvelope } from "react-icons/fa6";

function SendEmail() {
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(sendResetPasswordEmail, null);

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <>
      <div className="flex items-center gap-x-4 mt-5">
        <Remember />
        <span className="text-white text-sm md:text-base">
          بازیابی رمز عبور
        </span>
      </div>
      <Desc title="کاربر گرامی ، لطفا ایمیل خود را با دقت وارد نمایید" />

      <form action={handleSubmit} className="space-y-[24px]">
        <div className="flex flex-col gap-y-3">
          <Label title="ایمیل" />
          <div className="bg-[#121212] rounded-xl flex items-center justify-between gap-x-2">
            <Input
              type="email"
              name="email"
              disabled={isPending}
              placeholder="ایمیل خود را وارد کنید ..."
              onChange={(e) => {
                setIsActiveEmail(e.target.value.trim().length > 0);
              }}
              dir={isActiveEmail ? "ltr" : "rtl"}
              className={isActiveEmail ? "text-left" : "text-right"}
            />
            <FaEnvelope className="text-xl ml-4" />
          </div>
        </div>

        {state?.message && (
          <div
            className={`text-sm mt-2 ${state.success ? "text-green-500" : "text-red-500"}`}
          >
            {state.message}
          </div>
        )}

        <Button className="!h-[50px]" disabled={isPending}>
          {isPending ? <Spinner /> : "ارسال درخواست"}
        </Button>
      </form>
    </>
  );
}

export default SendEmail;
