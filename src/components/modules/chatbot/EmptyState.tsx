import React from "react";
import { FaRobot } from "react-icons/fa6";

function EmptyState() {
  return (
    <div className="text-center text-gray-400 mt-10">
      <FaRobot className="mx-auto text-4xl mb-2" />
      <p className="text-sm md:text-base">
        سلام! من دستیار فیلم‌های این سایت هستم.
      </p>
      <p className="text-xs md:text-sm mt-1">
        در مورد فیلم‌ها و سریال‌ها سوال بپرسید.
      </p>
    </div>
  );
}

export default EmptyState;
