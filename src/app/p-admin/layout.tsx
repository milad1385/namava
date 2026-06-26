import Sidebar from "@/src/components/modules/p-admin/Sidebar";
import TopBar from "@/src/components/modules/p-admin/Topbar";
import AdminPanelProvider from "@/src/context/AdminPanelProvider";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | پنل مدیریت",
    default: "پنل مدیریت",
  },
  description: "از این بخش میتوان بخش های مختلف یک سایت را مدیریت کرد",
  keywords: "پنل مدیریت ، ادمین ، ویرایش ، مدیریت",
};

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminPanelProvider>
      <div className="flex min-h-screen font-Poppins">
        <Sidebar />
        <div className="w-full">
          <TopBar />
          <div className="px-[1.2rem] md:px-[2.5rem] py-[2rem] min-h-screen">{children}</div>
          <div className="text-white flex flex-col gap-y-4 md:hidden items-center justify-center h-24 bg-milafilmBlack">
            <p>داشبورد مدیریت سایت میلا فیلم</p>
            <p className="text-gray-300 text-sm">
              توسعه داده شده با ❤️ توسط میلاد سلامیان
            </p>
          </div>
        </div>
      </div>
    </AdminPanelProvider>
  );
}

export default AdminLayout;
