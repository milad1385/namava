import React from "react";
import { FaPaperPlane } from "react-icons/fa6";

function ChatFooter({
  input,
  setInput,
  isLoading,
  onSendMessage,
  inputRef,
}: {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSendMessage: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <form
      onSubmit={onSendMessage}
      className="p-2 md:p-3 border-t border-gray-200 bg-white flex gap-2"
    >
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="پیام خود را بنویسید..."
        className="flex-1 border border-gray-300 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="bg-blue-600 text-white rounded-full p-2 px-3 md:px-4 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="ارسال پیام"
      >
        <FaPaperPlane size={14} className="md:text-[16px]" />
      </button>
    </form>
  );
}

export default ChatFooter;
