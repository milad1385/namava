import Image from "next/image";
import React from "react";

function Bank({ icon, name, onSelect, selected }: any) {
  return (
    <div
      className={`bg-black cursor-pointer text-white flex items-center ${
        name === selected ? "border border-white" : ""
      } gap-x-4 rounded-md py-3 px-4`}
      onClick={() => onSelect(name)}
    >
      <Image
        className="w-[32px] object-cover h-[32px]"
        width={1920}
        height={1080}
        alt={`bank-image-${name}`}
        src={`/images/banks/${icon}`}
      />
      <span className="text-sm">{name}</span>
    </div>
  );
}

export default Bank;
