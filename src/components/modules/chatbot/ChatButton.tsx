"use client";

import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import ChatWidget from "./ChatWidget";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* دکمه دایره‌ای پایین سمت راست */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-2xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center ${
          isOpen ? "rotate-90" : ""
        }`}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </button>

      {/* کارت چت که با کلیک روی دکمه باز/بسته می‌شود */}
      {isOpen && <ChatWidget onClose={() => setIsOpen(false)} />}
    </>
  );
}
