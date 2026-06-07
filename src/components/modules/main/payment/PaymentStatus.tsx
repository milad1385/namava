"use client";
import React, { useEffect, useState } from "react";
import Button from "../../auth/Button/Button";
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import MiniSpinner from "../../spinner/MiniSpinner";

function PaymentStatus() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);
  const [paidTime, setPaidTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const orderId = searchParams.get("orderId");
  const trackId = searchParams.get("trackId");
  const success = searchParams.get("success");
  const status = searchParams.get("status");

  if (!orderId || !trackId) {
    notFound();
  }

  useEffect(() => {
    const verifyPayment = async () => {
      setIsLoading(true);
      const res = await fetch(
        `/api/payment/verify?orderId=${orderId}&trackId=${trackId}&success=${success}&status=${status}`,
      );
      const data = await res.json();

      setIsLoading(false);

      if (res.ok) {
        setOrder(data);
        if (data?.data.paid_time) {
          const date = new Date(data?.data?.paid_time);
          const persianDate = date
            .toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })
            .replace(/[۰-۹]/g, function (d) {
              return d;
            })
            .replace("،", " ")
            .replace("ساعت", "")
            .trim();

          setPaidTime(persianDate);
        }
      } else {
        router.replace("/");
      }
    };

    verifyPayment();
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="my-40">
        <MiniSpinner />
      </div>
    );
  }

  return (
    <div className="bg-namavaBlack my-40 w-full px-[28] rounded-md py-6 md:w-1/3 mx-auto text-white">
      <h1 className="text-base md:text-lg font-IranMedium text-center">
        جزییات سفارش
      </h1>
      <ul className="w-full mt-5 space-y-4 border-b border-b-slate-500 pb-4">
        <li className="flex items-center justify-between">
          <span>شرح : </span>
          <span>{order?.data?.subscription.title}</span>
        </li>
        <li className="flex items-center justify-between">
          <span>شماره سفارش : </span>
          <span className="font-Dana">{order?.data?.orderNumber}</span>
        </li>
        <li className="flex items-center justify-between">
          <span>زمان و ثبت سفارش : </span>
          <span>{paidTime}</span>
        </li>
        <li className="flex items-center justify-between">
          <span>وضعیت سفارش : </span>
          <span className={paidTime ? "text-green-600" : "text-red-700"}>
            {order?.message}
          </span>
        </li>
      </ul>
      <ul className="w-full mt-5 space-y-4">
        <li className="flex items-center justify-between">
          <span>قیمت : </span>
          <span>
            {(order?.data?.totalPrice + order?.data?.discount).toLocaleString(
              "fa-IR",
            )}{" "}
            تومان
          </span>
        </li>
        <li className="flex items-center justify-between text-red-700">
          <span>جمع تخفیف : </span>
          <span> {order?.data?.discount.toLocaleString("fa-IR")} تومان</span>
        </li>

        <li className="flex items-center justify-between text-namava">
          <span>
            {" "}
            {order?.data?.status !== "cancel" ? "مبلغ پرداختی" : "مبلغ کل"}{" "}
            :{" "}
          </span>
          <span>{order?.data?.totalPrice.toLocaleString("fa-IR")} تومان</span>
        </li>

        {order?.data?.status !== "cancel" ? (
          <a href="/" className="mt-10 block">
            <Button>بازگشت</Button>
          </a>
        ) : (
          <Link href="/plans" className="mt-10 block">
            <Button className="!bg-red-600">تلاش دوباره</Button>
          </Link>
        )}
      </ul>
    </div>
  );
}

export default PaymentStatus;
