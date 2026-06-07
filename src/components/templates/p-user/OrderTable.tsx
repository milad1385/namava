"use client";
import { IOrdersList } from "@/src/libs/types";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { FaEye, FaRegCircleXmark } from "react-icons/fa6";
import EmptyBox from "../../modules/p-admin/EmptyBox";
import Pagination from "../../modules/pagination/Pagination";
import Table from "../../modules/table/Table";

function OrderTable({ orders, orderCount, filter }: IOrdersList) {
  let ordersList = orders;

  if (filter === "all") {
    ordersList = orders;
  }
  if (filter === "success") {
    ordersList = orders.filter((order) => order.status === "pay");
  }
  if (filter === "unsuccess") {
    ordersList = orders.filter((order) => order.status === "pending");
  }
  return (
    <div className="users-list mt-5 overflow-hidden bg-namavaBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>ردیف</th>
          <th>زمان سفارش</th>
          <th>نوع سفارش</th>
          <th>شماره سفارش</th>
          <th>مبلغ پرداختی</th>
          <th>وضعیت پرداخت</th>
          <th></th>
        </Table.Header>
        <Table.Body>
          {ordersList.map((order, index) => (
            <Table.Row key={order._id}>
              <td>{index + 1}</td>
              <td> {new Date(order.createdAt).toLocaleString("fa")}</td>
              <td>{order.subscription.title}</td>
              <td>{order.orderNumber}</td>
              <td>{order.totalPrice.toLocaleString("fa-IR")} تومان</td>
              <td>
                {order.status === "pending" && (
                  <div className="flex items-center justify-center gap-x-3 text-red-700">
                    <FaRegCircleXmark className="text-xl" />
                    <span>ناموفق</span>
                  </div>
                )}
                {order.status === "pay" && (
                  <div className="flex items-center justify-center gap-x-3 text-green-700">
                    <FaCheckCircle className="text-xl" />
                    <span>موفق</span>
                  </div>
                )}
              </td>
              <td>
                <Link href={`/p-user/orders/${order._id}`}>
                  <FaEye className="text-xl text-namava" />
                </Link>
              </td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {ordersList.length > 0 ? (
        <Pagination count={orderCount} />
      ) : (
        <EmptyBox title="اطلاعات مورد نظر یافت نشد" />
      )}
    </div>
  );
}

export default OrderTable;
