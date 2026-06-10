import React from "react";
import { FaTimes } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";

function Header({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <FaRobot />
        <span className="font-semibold text-sm md:text-base">
          دستیار هوشمند فیلم‌ها
        </span>
      </div>
      <button
        onClick={onClose}
        className="hover:bg-blue-700 p-1 rounded-full transition-colors"
        aria-label="بستن چت"
      >
        <FaTimes />
      </button>
    </div>
  );
}

export default Header;
