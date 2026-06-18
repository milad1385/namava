import Button from "@/src/components/modules/auth/Button/Button";
import { getOrder } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { getDateWithTime } from "@/src/utils/funcs";
import Link from "next/link";

async function page({ params }: TParams) {
  const order = await getOrder(params.id as string);
  const paidTime = getDateWithTime(order.paid_time);
  const orderStatusStyle =
    order.status === "pay" ? "text-green-600" : "text-red-600";
  return (
    <div className="bg-milafilmBlack w-full px-[28] rounded-md py-6 md:w-1/2 mx-auto text-white">
      <h1 className="text-base md:text-lg font-IranMedium text-center">
        جزییات سفارش
      </h1>
      <ul className="w-full mt-5 space-y-4 border-b border-b-slate-500 pb-4">
        <li className="flex items-center justify-between">
          <span>شرح : </span>
          <span>{order.subscription.title}</span>
        </li>
        <li className="flex items-center justify-between">
          <span>شماره سفارش : </span>
          <span className="font-Dana">{order.orderNumber}</span>
        </li>
        <li className="flex items-center justify-between">
          <span>زمان و ثبت سفارش : </span>
          <span>{paidTime}</span>
        </li>
        <li className="flex items-center justify-between">
          <span>وضعیت سفارش : </span>
          <span className={orderStatusStyle}>
            {order.status === "pay" ? "موفق" : "ناموفق"}
          </span>
        </li>
      </ul>
      <ul className="w-full mt-5 space-y-4">
        <li className="flex items-center justify-between">
          <span>قیمت : </span>
          <span>
            {(order.totalPrice + order.discount).toLocaleString("fa-IR")} تومان
          </span>
        </li>
        <li className={`flex items-center justify-between ${orderStatusStyle}`}>
          <span>جمع تخفیف : </span>
          <span>{order.discount.toLocaleString("fa-IR")} تومان</span>
        </li>
        <li
          className={`flex items-center justify-between ${order.status === "pay" ? "text-milafilm" : "text-red-600"}`}
        >
          <span>مبلغ پرداختی : </span>
          <span>{order.totalPrice.toLocaleString("fa-IR")} تومان</span>
        </li>
        <Link
          href="/p-user/orders"
          className={`block mt-10 ${order.status === "pay" ? "" : "!bg-red-600"}`}
        >
          <Button>بازگشت</Button>
        </Link>
      </ul>
    </div>
  );
}

export default page;
