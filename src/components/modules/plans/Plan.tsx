import Link from "next/link";
import React from "react";

function Plan({ subscription }: any) {
  return (
    <Link
      href={`/plans/${subscription._id}`}
      className="bg-milafilmBlack cursor-pointer flex items-center justify-between py-4 px-5 rounded-lg"
    >
      <div className="space-y-3">
        <h3 className="text-base md:text-lg">{subscription.title}</h3>

        {subscription.discount > 0 && (
          <div className="bg-milafilm font-Dana text-xs md:text-sm text-white px-3 py-1 rounded-2xl">
            {subscription.discount} % تخفیف ویژه خرید اشتراک
          </div>
        )}
      </div>
      <div className="flex items-center flex-col gap-y-3 text-sm md:text-base">
        {subscription.discount > 0 && (
          <span className="font-Dana text-[#ddd] relative">
            <span className="font-bold">
              {subscription.price.toLocaleString("fa-IR")}
            </span>{" "}
            هزار تومان
            <span className="block absolute w-[1.5px] h-20 md:h-28 bg-red-600/80 top-1/2 left-1/2 -translate-y-1/2 rotate-[70deg]"></span>
          </span>
        )}
        <span className="font-Dana text-milafilm">
          <span className="font-bold">
            {(
              subscription.price -
              (subscription.price * subscription.discount) / 100
            ).toLocaleString("fa-IR")}
          </span>{" "}
          هزار تومان
        </span>
      </div>
    </Link>
  );
}

export default Plan;
