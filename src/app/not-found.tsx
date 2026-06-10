import Button from "@/src/components/modules/auth/Button/Button";
import Error from "@/src/icons/Error";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="flex-center flex-col min-h-screen text-white space-y-4">
      <Error />
      <h3 className="text-sm md:text-lg">صفحه مورد نظر شما یافت نشد.</h3>
      <p className="text-xs md:text-base text-[#ccc]">
        برای دیدن هزاران فیلم و سریال، به صفحه اصلی میلا فیلم بروید.
      </p>
      <Link href={"/"} className="w-[240px] block">
        <Button className="bg-white text-xs md:text-base w-[240px] text-namavaBlack mt-8">
          رفتن به خانه
        </Button>
      </Link>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "صفحه یافت نشد - 404",
  };
}

export default NotFound;
