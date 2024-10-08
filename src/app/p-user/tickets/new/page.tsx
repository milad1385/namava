import SendTicketForm from "@/src/components/templates/p-user/SendTicketForm";
import { getAllDepartments } from "@/src/libs/service/services";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ارسال تیکت جدید ",
};

async function page() {
  const departments = await getAllDepartments();
  return (
    <>
      <h1 className="text-lg md:text-2xl font-bold text-white">
        ارسال تیکت جدید
      </h1>
      <SendTicketForm departments={JSON.parse(JSON.stringify(departments))} />
    </>
  );
}

export default page;
