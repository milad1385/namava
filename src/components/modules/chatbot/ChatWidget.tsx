"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaTimes } from "react-icons/fa";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isLoading) {
      scrollToBottom();
    }
  }, [isLoading, scrollToBottom, messages]);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      let assistantMessage = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        assistantMessage += chunk;

        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          if (lastIndex >= 0 && newMessages[lastIndex].role === "assistant") {
            newMessages[lastIndex].content = assistantMessage;
          }
          return [...newMessages];
        });

        scrollToBottom();
      }
    } catch (err) {
      console.error("خطا در ارتباط با چت:", err);
      setError("مشکلی در ارتباط با سرور پیش آمد. لطفاً دوباره تلاش کنید.");
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        if (lastIndex >= 0 && newMessages[lastIndex].role === "assistant") {
          newMessages[lastIndex].content = "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.";
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearError = () => setError(null);

  return (
    <>
      {/* ✅ پس‌زمینه تاریک برای موبایل */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={onClose}
      />
      
      {/* ✅ کارت چت - ریسپانسیو */}
      <div className={`
        fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden
        /* موبایل (کمتر از 768px) */
        inset-x-0 bottom-0 rounded-b-none rounded-t-2xl h-[85vh] w-full
        /* تبلت و دسکتاپ (بیشتر از 768px) */
        md:bottom-24 md:right-6 md:inset-auto md:rounded-b-2xl md:h-[550px] md:w-[380px]
        animate-in slide-in-from-bottom-5 duration-300
      `}>
        <Header onClose={onClose} />

        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          <ChatBody 
            messages={messages} 
            isLoading={isLoading} 
            error={error}
            onClearError={clearError}
          />
          <div ref={messagesEndRef} />
        </div>

        <ChatFooter 
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          onSendMessage={sendMessage}
          inputRef={inputRef}
        />
      </div>
    </>
  );
}

// ✅ بقیه کامپوننت‌ها (بدون تغییر)
function ChatBody({ 
  messages, 
  isLoading, 
  error, 
  onClearError 
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
          <button onClick={onClearError} className="text-red-700 hover:text-red-800">
            <FaTimes size={12} />
          </button>
        </div>
      )}

      {messages.length === 0 && !error && <EmptyState />}

      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} isLoading={isLoading && idx === messages.length - 1} />
      ))}
    </>
  );
}

function Header({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <FaRobot />
        <span className="font-semibold text-sm md:text-base">دستیار هوشمند فیلم‌ها</span>
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

function EmptyState() {
  return (
    <div className="text-center text-gray-400 mt-10">
      <FaRobot className="mx-auto text-4xl mb-2" />
      <p className="text-sm md:text-base">سلام! من دستیار فیلم‌های این سایت هستم.</p>
      <p className="text-xs md:text-sm mt-1">در مورد فیلم‌ها و سریال‌ها سوال بپرسید.</p>
    </div>
  );
}

function MessageBubble({ message, isLoading }: { message: Message; isLoading?: boolean }) {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-start gap-2 max-w-[85%] md:max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-blue-600" : "bg-gray-400"
        }`}>
          {isUser ? <FaUser size={12} className="text-white md:text-[14px]" /> : <FaRobot size={12} className="text-white md:text-[14px]" />}
        </div>
        
        <div className={`p-2 md:p-3 rounded-2xl text-sm md:text-base ${
          isUser 
            ? "bg-blue-600 text-white rounded-br-none" 
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
        }`}>
          {message.content || (isLoading ? "..." : "")}
        </div>
      </div>
    </div>
  );
}

function ChatFooter({ 
  input, 
  setInput, 
  isLoading, 
  onSendMessage, 
  inputRef 
}: { 
  input: string; 
  setInput: (value: string) => void; 
  isLoading: boolean; 
  onSendMessage: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <form onSubmit={onSendMessage} className="p-2 md:p-3 border-t border-gray-200 bg-white flex gap-2">
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