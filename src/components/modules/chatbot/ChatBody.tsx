import { Message } from "@/src/libs/types";
import React from "react";
import { FaTimes } from "react-icons/fa";
import EmptyState from "./EmptyState";
import MessageBubble from "./MessageBubble";
function ChatBody({
  messages,
  isLoading,
  error,
  onClearError,
}: {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
}) {
  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={onClearError}
            className="text-red-700 hover:text-red-800"
          >
            <FaTimes size={12} />
          </button>
        </div>
      )}

      {messages.length === 0 && !error && <EmptyState />}

      {messages.map((msg, idx) => (
        <MessageBubble
          key={idx}
          message={msg}
          isLoading={isLoading && idx === messages.length - 1}
        />
      ))}
    </>
  );
}

export default ChatBody;
