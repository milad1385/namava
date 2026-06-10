"use client";

import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import ChatWidget from "./ChatWidget";
import { usePathname } from "next/navigation";
import { limitedRoute } from "@/public/db";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const result = limitedRoute.some((route) => pathname.includes(route));
  if (result) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-2xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center ${
          isOpen ? "rotate-90" : ""
        }`}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </button>

      {isOpen && <ChatWidget onClose={() => setIsOpen(false)} />}
    </>
  );
}
