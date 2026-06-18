import React, { ComponentProps } from "react";

type Button = ComponentProps<"button">;

function Button({ children, className, ...rest }: Button) {
  return (
    <button
      className={`text-sm w-full flex-center  bg-milafilm font-IranMedium disabled:bg-milafilm py-3 rounded-xl  ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
