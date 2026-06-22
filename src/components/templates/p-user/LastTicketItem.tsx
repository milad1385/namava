import { ILastTicket } from "@/src/libs/types";
import { formatDate } from "@/src/utils/funcs";
import Link from "next/link";
import React from "react";

function LastTicketItem({ ticket }: { ticket: ILastTicket }) {
  return (
    <Link
      href={`/p-user/tickets/${ticket._id}`}
      className="text-white bg-[#121212] p-4 rounded-md flex items-center justify-between"
    >
      <div className="space-y-3 text-sm md:text-base">
        <h4>{ticket.title}</h4>
        <div className="bg-white text-xs md:text-sm w-[90px] text-[#121212] flex-center py-2 rounded-md">
          {ticket.department.title}
        </div>
      </div>
      <div className="text-center space-y-3">
        <h5 className="font-Dana  text-sm md:text-base">
          {formatDate(ticket.createdAt)}
        </h5>
        <p
          className={`text-xs md:text-sm ${
            ticket.status === "answered" ? "text-green-600" : "text-red-600"
          }`}
        >
          پاسخ داده {ticket.status === "answered" ? "شده" : "نشده"}
        </p>
      </div>
    </Link>
  );
}

export default LastTicketItem;
