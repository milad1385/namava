"use client";
import Logo from "@/src/icons/Logo";
import Link from "next/link";
import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaPerson } from "react-icons/fa6";
import {
  HiArrowLeftOnRectangle,
  HiOutlineHomeModern,
  HiOutlineNewspaper,
  HiOutlineSquare2Stack,
  HiUser,
  HiXMark,
} from "react-icons/hi2";
import { GoCommentDiscussion } from "react-icons/go";
import { IoImageOutline, IoTicketOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdContentPaste } from "react-icons/md";
import { useAdminPanel } from "@/src/context/AdminPanelProvider";
import Overlay from "../Overlay/Overlay";
import { usePathname } from "next/navigation";

function Sidebar() {
  const { isShowMenu, toggleMenu } = useAdminPanel();
  const pathname = usePathname();
  const menus = [
    {
      id: 1,
      title: "داشبورد",
      icon: <HiOutlineHomeModern className="icon-item" />,
      href: "/p-admin",
    },
    {
      id: 2,
      title: "فیلم و سریال",
      icon: <AiOutlineProduct className="icon-item" />,
      href: "/p-admin/movies",
    },
    {
      id: 3,
      title: "دسته بندی ها",
      icon: <HiOutlineSquare2Stack className="icon-item" />,
      href: "/p-admin/categories",
    },
    {
      id: 4,
      title: "کاربران",
      icon: <HiUser className="icon-item" />,
      href: "/p-admin/users",
    },
    {
      id: 5,
      title: "مجموعه ها",
      icon: <IoImageOutline className="icon-item" />,
      href: "/p-admin/collection",
    },
    {
      id: 6,
      title: "مقاله ها",
      icon: <HiOutlineNewspaper className="icon-item" />,
      href: "/p-admin/articles",
    },
    {
      id: 7,
      title: "اشتراک ها",
      icon: <MdOutlineShoppingCart className="icon-item" />,
      href: "/p-admin/subscription",
    },
    {
      id: 8,
      title: "ستارگان",
      icon: <FaPerson className="icon-item" />,
      href: "/p-admin/actors",
    },
    {
      id: 9,
      title: "منو ها",
      icon: <HiOutlineNewspaper className="icon-item" />,
      href: "/p-admin/menus",
    },
    {
      id: 10,
      title: "کامنت ها",
      icon: <GoCommentDiscussion className="icon-item" />,
      href: "/p-admin/comments",
    },
    {
      id: 11,
      title: "تیکت ها",
      icon: <IoTicketOutline className="icon-item" />,
      href: "/p-admin/tickets",
    },
    {
      id: 12,
      title: "پیغام ها",
      icon: <MdContentPaste className="icon-item" />,
      href: "/p-admin/contacts",
    },
  ];

  return (
    <>
      <div className="md:w-[260px] bg-milafilmBlack">
        <div
          className={`fixed md:sticky ${
            isShowMenu ? "right-0" : "right-[-260px] "
          } md:right-0 overflow-y-auto z-40 bottom-0 transition-all top-0  border-l bg-milafilmBlack border-l-gray-700 w-[260px] gap-2  flex flex-col  md:py-[1.2rem] p-2 md:px-[1rem] text-lg`}
        >
          <div className="px-[13px] flex border-b md:border-0 border-b-gray-600 items-center justify-between md:mx-auto">
            <Logo />
            <HiXMark
              className="block md:hidden text-white text-lg font-bold"
              onClick={() => toggleMenu()}
            />
          </div>
          <div>
            <ul className="text-[#4b5563] space-y-2">
              {menus.map((menu) => (
                <li key={menu.id} className="group">
                  <Link
                    href={menu.href}
                    className={`nav-item ${menu.href === pathname ? "active" :""}`}
                  >
                    {menu.icon}
                    <span>{menu.title}</span>
                  </Link>
                </li>
              ))}
              <li className="group block md:hidden">
                <Link href="/orders" className="nav-item">
                  <HiArrowLeftOnRectangle className="icon-item" />
                  <span>خروج</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Overlay isOpen={isShowMenu} onClose={toggleMenu} />
    </>
  );
}

export default Sidebar;
