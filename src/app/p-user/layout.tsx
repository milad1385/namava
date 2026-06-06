import Sidebar from "@/src/components/modules/p-user/Sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | پنل کاربری",
    default: "پنل کاربری",
  },
  description:
    "در این پنل میتوانید اطلاعات و عملکرد و کارکرد اکانت خود را بررسی کنید",
};

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  gap-x-5 container my-28">
      <Sidebar />
      <div className="w-full rounded-md">{children}</div>
    </div>
  );
}

export default UserLayout;
