import Plan from "@/src/components/modules/plans/Plan";
import { getSubscriptions } from "@/src/libs/service/services";
import { Metadata } from "next";
import React from "react";
import { ImWarning } from "react-icons/im";

export const metadata: Metadata = {
  title: "خرید اشتراک",
  description: "از این بخش امکان خرید اشتراک وجود دارد",
};

async function page() {
  const subscriptions: any = await getSubscriptions();
  return (
    <div className="my-28 text-white">
      <h1 className="text-center text-lg md:text-xl lg:text-2xl">
        اشتراک خود را انتخاب کنید
      </h1>

      <div className="max-w-[640px] mx-auto space-y-6 mt-10 px-3">
        {subscriptions.map((subscription: any) => (
          <Plan subscription={subscription} key={subscription._id} />
        ))}

        <p className="text-[#aaa] text-xs md:text-base">
          به مبالغ فوق ۱۰٪ بابت مالیات بر ارزش افزوده اضافه می‌شود.
        </p>
        <div className="py-4 px-5 rounded-lg bg-namavaBlack space-y-3">
          <h2 className="text-sm md:text-lg">
            با خرید اشتراک به امکانات زیر دسترسی خواهید داشت:
          </h2>
          <ul className="pr-4 list-disc text-xs/[25px] md:text-sm text-[#d2d2d2]">
            <li>
              تماشای نامحدود هزاران فیلم و سریال و انیمیشن جذاب میلا فیلم در طول مدت
              اشتراک خریداری شده.
            </li>
          </ul>
        </div>
        <div className="py-4 px-5 rounded-lg bg-red-700 flex items-center gap-x-5">
          <ImWarning className="flex-shrink-0" />
          <div className="space-y-3">
            <h2 className="text-sm md:text-base">
              تماشای فیلم های خارجی تنها برای کاربران داخل ایران امکان پذیر است.
            </h2>
            <h5 className="text-[#d8d7d7] text-xs/[25px] md:text-sm">
              کاربران خارج از ایران با خرید اشتراک میلا فیلم، تنها به فیلم های
              ایرانی دسترسی خواهند داشت.
            </h5>
          </div>
        </div>
        <div className="py-4 px-5 rounded-lg bg-namava space-y-3">
          <h4 className="text-sm md:text-base">
            هفت روز هفته، ۲۴ ساعت شبانه‌روز پاسخگوی شما هستیم.
          </h4>
          <div className="flex items-center justify-between text-sm">
            <a href="tel:02191000111" className="font-Dana">
              021-91000111
            </a>
            <a href="mailto:support@namava.ir">support@namava.ir</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
