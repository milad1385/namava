import { Message } from "@/src/libs/types";
import React from "react";
import { FaRobot, FaUser } from "react-icons/fa6";

function MessageBubble({
  message,
  isLoading,
}: {
  message: Message;
  isLoading?: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-start gap-2 max-w-[85%] md:max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          {isUser ? (
            <FaUser size={12} className="text-white md:text-[14px]" />
          ) : (
            <FaRobot size={12} className="text-white md:text-[14px]" />
          )}
        </div>

        <div
          className={`p-2 md:p-3 rounded-2xl text-sm md:text-base ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
          }`}
        >
          {message.content || (isLoading ? "..." : "")}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
