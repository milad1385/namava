import Pagination from "@/components/modules/pagination/Pagination";
import Table from "@/components/modules/table/Table";
import Image from "next/image";
import React from "react";
import { FaPencil, FaTrash } from "react-icons/fa6";

function MenusList() {
  return (
    <div className="users-list mt-10 overflow-hidden bg-namavaBlack  rounded-md">
      <Table>
        <Table.Header>
          <th>شماره</th>
          <th>عنوان</th>
          <th>لینک</th>
          <th>پرنت</th>
          <th>تاریخ</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <td>1</td>
            <td>فیلم ها و سریال ها</td>
            <td>films-seraies</td>
            <td>----</td>
            <td>1403/04/05</td>
            <td>
              <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                <FaTrash className="text-red-600 text-base md:text-lg" />
                <FaPencil className="text-sky-600 text-base md:text-lg" />
              </div>
            </td>
          </Table.Row>
          <Table.Row>
            <td>1</td>
            <td>فیلم ها و سریال ها</td>
            <td>films-seraies</td>
            <td>----</td>
            <td>1403/04/05</td>
            <td>
              <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                <FaTrash className="text-red-600 text-base md:text-lg" />
                <FaPencil className="text-sky-600 text-base md:text-lg" />
              </div>
            </td>
          </Table.Row>
          <Table.Row>
            <td>1</td>
            <td>فیلم ها و سریال ها</td>
            <td>films-seraies</td>
            <td>----</td>
            <td>1403/04/05</td>
            <td>
              <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                <FaTrash className="text-red-600 text-base md:text-lg" />
                <FaPencil className="text-sky-600 text-base md:text-lg" />
              </div>
            </td>
          </Table.Row>
          <Table.Row>
            <td>1</td>
            <td>فیلم ها و سریال ها</td>
            <td>films-seraies</td>
            <td>----</td>
            <td>1403/04/05</td>
            <td>
              <div className="flex items-center justify-center gap-x-3 md:gap-x-6 child:cursor-pointer">
                <FaTrash className="text-red-600 text-base md:text-lg" />
                <FaPencil className="text-sky-600 text-base md:text-lg" />
              </div>
            </td>
          </Table.Row>
        </Table.Body>
      </Table>
      <Pagination />
    </div>
  );
}

export default MenusList;
