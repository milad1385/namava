import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import LastTicketItem from "./LastTicketItem";
import Link from "next/link";
import { getLastUserTickets } from "@/src/libs/service/services";
import { ILastTicket } from "@/src/libs/types";
import { FaTicket } from "react-icons/fa6";

async function LastTickets() {
  const tickets = (await getLastUserTickets()) as ILastTicket[];

  return (
    <div className="bg-milafilmBlack rounded-md border  border-gray-800 shadow py-4 md:pb-6 md:pt-5 px-3 md:px-6">
      <div className="text-white flex items-center justify-between border-b border-gray-600 pb-1">
        <span className="text-sm md:text-base pb-2 font-IranMedium">تیکت های اخیر</span>
        <Link
          href="/p-user/tickets"
          className="flex items-center gap-x-1 md:gap-x-2 text-milafilm text-sm"
        >
          همه تیکت ها
          <IoMdArrowRoundBack className="text-sm md:text-lg" />
        </Link>
      </div>
      <div className="overflow-hidden max-h-[225px] md:max-h-[365px] recent-box overflow-y-auto">
        <div className="my-4 space-y-4">
          {tickets.length ? (
            tickets.map((ticket) => (
              <LastTicketItem key={ticket._id} ticket={ticket} />
            ))
          ) : (
            <div className="bg-milafilm flex-center  lg:mt-[40px] flex-col gap-y-4 py-12 lg:py-28 text-white rounded-md shadow">
              <FaTicket className="text-2xl md:text-3xl lg:text-4xl" />
              <p className="text-xs md:text-base">
                هیچ تیکتی تاکنون توسط شما ارسال نشده است
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LastTickets;
