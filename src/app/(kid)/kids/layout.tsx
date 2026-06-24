import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | میلا فیلم",
    default: "تماشای آنلاین انیمیشن، انیمه و کارتون - میلا فیلم",
  },
  description:
    "میلا فیلم کودک، آرشیو بهترین انیمیشن ها، بهترین انیمه های سریالی، انیمه دوبله فارسی، انیمیشن و کارتون، انیمه سینمایی، انیمه ژاپنی، بهترین انیمه های جهان، انیمه و انیمیشن",
};

function KidLayout({ children }: { children: React.ReactNode }) {
  return <div className="!bg-white min-h-screen pb-10">{children}</div>;
}

export default KidLayout;
