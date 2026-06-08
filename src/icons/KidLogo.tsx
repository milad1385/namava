import Image from "next/image";
import React from "react";

function KidLogo({ className }: any) {
  return (
    <Image
      src="/images/kidLogo.png"
      className="w-[120px] md:w-[140px]"
      alt="main-logo"
      width={1920}
      height={1080}
    />
  );
}

export default KidLogo;
