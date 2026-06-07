"use client";
import { banks } from "@/public/db";
import React, { useState } from "react";
import Bank from "./Bank";
import Button from "../auth/Button/Button";
import toast from "react-hot-toast";
import { addSubscription } from "@/src/libs/actions/subscription";
import { useRouter } from "next/navigation";
import { IPaymentGateway } from "@/src/libs/types";
import Spinner from "../spinner/Spinner";

function PaymentGateway({
  totalPrice,
  time,
  title,
  discount,
  subscriptionId,
}: IPaymentGateway) {
  const router = useRouter();
  const [activeBank, setActiveBank] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const paymentHandler = async () => {
    if (!activeBank) {
      return toast.error("لطفا یک درگاه را انتخاب کنید");
    }

    // const res: any = await addSubscription(time, totalPrice, title, discount);
    // if (res?.status === 200) {
    //   toast.success(`${res.message}`);
    //   return location.replace("/");
    // }

    // return toast.error(`${res?.message}`);
    setIsLoading(true);
    const res = await fetch(`/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application.js",
      },
      body: JSON.stringify({
        subscriptionId,
      }),
    });

    const data = await res.json();

    setIsLoading(false);
    if (res.ok) {
      router.replace(data.paymentUrl);
    } else {
      return toast.error(`${data.message}`);
    }
  };
  return (
    <div className="bg-namavaBlack  w-full px-[28px] rounded-md py-6 md:w-1/3 mx-auto text-white">
      <h2 className="text-base md:text-lg font-IranMedium text-center">
        درگاه پرداخت :
      </h2>
      <div className="space-y-4 mt-6">
        {banks.map((bank) => (
          <Bank
            onSelect={setActiveBank}
            selected={activeBank}
            key={bank.id}
            {...bank}
          />
        ))}

        <div className="flex items-center justify-between mt-6">
          <span> مبلغ قابل پرداخت : </span>
          <span className="text-sm text-namava">
            {totalPrice.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        <Button disabled={isLoading} className="!mt-8 h-[50px]" onClick={paymentHandler}>
          {isLoading ? <Spinner/> : " ادامه و پرداخت"}
        </Button>
      </div>
    </div>
  );
}

export default PaymentGateway;
