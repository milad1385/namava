"use client";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { ILastTicket, IUserTicket } from "@/src/libs/types";
import { formatDate } from "@/src/utils/funcs";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa6";
import EmptyBox from "../../modules/p-admin/EmptyBox";

function TicketsList({ tickets, ticketsCount, filter }: IUserTicket) {
  let ticketList = tickets;

  if (filter === "all") {
    ticketList = tickets;
  }
  if (filter === "answer") {
    ticketList = tickets.filter((ticket) => ticket.status === "answered");
  }
  if (filter === "pending") {
    ticketList = tickets.filter((ticket) => ticket.status === "pending");
  }
  if (filter === "close") {
    ticketList = tickets.filter((ticket) => !ticket.isOpen);
  }
  return (
    <div className="users-list mt-5 overflow-hidden bg-namavaBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>نام</th>
          <th>دپارتمان</th>
          <th>زیر مجموعه</th>
          <th>اولویت</th>
          <th>تاریخ</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {ticketList.map((ticket, index) => (
            <Table.Row key={ticket._id}>
              <td>{index + 1}</td>
              <td>{ticket.user.name}</td>
              <td>{ticket.department.title}</td>
              <td>{ticket.subDepartment.title}</td>

              <td>
                {ticket.priority === 1 && "زیاد"}
                {ticket.priority === 2 && "متوسط"}
                {ticket.priority === 3 && "کم"}
              </td>
              <td>{formatDate(ticket.createdAt)}</td>
              <td>
                <div
                  className={`${
                    ticket.status === "answered" ? "bg-green-600" : "bg-red-600"
                  } py-2 rounded-md font-IranMedium`}
                >
                  {ticket.status === "answered" && "پاسخ داده شده"}
                  {ticket.status === "pending" && "در انتظار پاسخ"}
                </div>
              </td>
              <td>
                <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                  <Link href={`/p-user/tickets/${ticket._id}`}>
                    <FaEye className="text-namava text-base md:text-lg" />
                  </Link>
                </div>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {ticketList.length > 0 ? (
        <Pagination count={ticketsCount} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default TicketsList;
