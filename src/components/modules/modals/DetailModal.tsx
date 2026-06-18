import Message from "@/src/icons/Message";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import Button from "../auth/Button/Button";

function DetailModal({ msg, onClose }: { msg: string; onClose?: any }) {
  return (
    <div className="w-[350px] md:w-[500px] bg-milafilmBlack relative rounded-md text-black px-4 pt-5 pb-7">
      <FaXmark
        onClick={() => onClose()}
        className="text-lg md:text-3xl absolute left-3 top-3 md:cursor-pointer text-white"
      />
      <form className="flex-center flex-col space-y-5">
        <Message className="!w-[136px] !h-[137px]" />
        <p className="text-lg font-Iran text-center whitespace-normal text-white">{msg}</p>
        <Button
          className="!mt-8 text-white !w-full"
          onClick={onClose}
        >
          مشاهده کردم
        </Button>
      </form>
    </div>
  );
}

export default DetailModal;
