import Image from "next/image";
import React from "react";

interface Logo {
  className?: string;
}
function Logo({ className }: Logo) {
  return (
    <Image
      src="/images/mainLogo.png"
      className="w-[100px]"
      alt="main-logo"
      width={1920}
      height={1080}
    />
  );
}

export default Logo;
