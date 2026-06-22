"use client";
import ConfirmModal from "@/src/components/modules/modals/ConfirmModal";
import Modal from "@/src/components/modules/modals/Modal";
import EmptyBox from "@/src/components/modules/p-admin/EmptyBox";
import Pagination from "@/src/components/modules/pagination/Pagination";
import Table from "@/src/components/modules/table/Table";
import { closeOrOpenTheTickets } from "@/src/libs/actions/ticket";
import { IPanelTicket } from "@/src/libs/types";
import { formatDate } from "@/src/utils/funcs";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaCheck, FaEye, FaTrash, FaXmark } from "react-icons/fa6";

function TicketsList({ tickets, ticketsCount }: IPanelTicket) {
  const openOrCloseTicketHandler = async (id: string, status: boolean) => {
    const res = await closeOrOpenTheTickets(id, status);
    if (res?.status === 200) {
      return toast.success(`${res?.message}`);
    }

    return toast.error(`${res?.message}`);
  };
  return (
    <div className="users-list mt-10 overflow-hidden bg-milafilmBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>نام</th>
          <th>دپارتمان</th>
          {/* <th>زیر مجموعه</th> */}
          <th>اولویت</th>
          <th>تاریخ</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {tickets.map((ticket, index) => (
            <Table.Row key={ticket._id}>
              <td
                className={
                  ticket.status === "answered" ? "bg-green-600" : "bg-red-600"
                }
              >
                {index + 1}
              </td>
              <td>{ticket.user.name}</td>
              <td>{ticket.department.title}</td>
              {/* <td>{ticket.subDepartment.title}</td> */}

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
                  <Modal>
                    <FaTrash className="text-red-600 text-base md:text-lg" />
                    <Modal.Open name="action">
                      {ticket.isOpen ? (
                        <FaXmark className="text-red-600 text-base md:text-lg" />
                      ) : (
                        <FaCheck className="text-green-500 text-base md:text-lg" />
                      )}
                    </Modal.Open>
                    <Modal.Page name="action">
                      <ConfirmModal
                        title={`آیا از ${
                          ticket.isOpen ? "بستن" : "باز کردن"
                        } تیکت اطمینان دارید ؟`}
                        onAction={() =>
                          openOrCloseTicketHandler(ticket._id, ticket?.isOpen)
                        }
                      />
                    </Modal.Page>
                    <Link href={`/p-admin/tickets/${ticket._id}`}>
                      <FaEye className="text-milafilm text-base md:text-lg" />
                    </Link>
                  </Modal>
                </div>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {tickets.length > 0 ? (
        <Pagination count={ticketsCount} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default TicketsList;
