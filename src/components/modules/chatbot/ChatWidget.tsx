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
  const inputRef = useRef<HTMLInputElement>(null);

  // اسکرول خودکار به انتهای چت
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // فوکوس خودکار روی اینپوت هنگام باز شدن
  useEffect(() => {
    inputRef.current?.focus();
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

    // پیام خالی برای پاسخ
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
          return newMessages;
        });
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
    <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
      {/* هدر */}
      <Header onClose={onClose} />

      {/* بدنه چت */}
      <ChatBody 
        messages={messages} 
        isLoading={isLoading} 
        error={error}
        onClearError={clearError}
      />

      {/* فوتر */}
      <ChatFooter 
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        onSendMessage={sendMessage}
        inputRef={inputRef}
      />
      
      <div ref={messagesEndRef} />
    </div>
  );
}

// ✅ کامپوننت هدر (جدا شده)
function Header({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <FaRobot />
        <span className="font-semibold">دستیار هوشمند فیلم‌ها</span>
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

// ✅ کامپوننت بدنه چت (جدا شده)
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
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
      {/* پیام خطا */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm flex justify-between items-center">
          <span>{error}</span>
          <button onClick={onClearError} className="text-red-700 hover:text-red-800">
            <FaTimes size={12} />
          </button>
        </div>
      )}

      {/* حالت خالی (بدون پیام) */}
      {messages.length === 0 && !error && (
        <EmptyState />
      )}

      {/* لیست پیام‌ها */}
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} isLoading={isLoading && idx === messages.length - 1} />
      ))}
    </div>
  );
}

// ✅ کامپوننت پیام خالی
function EmptyState() {
  return (
    <div className="text-center text-gray-400 mt-10">
      <FaRobot className="mx-auto text-4xl mb-2" />
      <p>سلام! من دستیار فیلم‌های این سایت هستم.</p>
      <p className="text-sm mt-1">در مورد فیلم‌ها و سریال‌ها سوال بپرسید.</p>
    </div>
  );
}

// ✅ کامپوننت حباب پیام
function MessageBubble({ message, isLoading }: { message: Message; isLoading?: boolean }) {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-start gap-2 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* آواتار */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-blue-600" : "bg-gray-400"
        }`}>
          {isUser ? <FaUser size={14} className="text-white" /> : <FaRobot size={14} className="text-white" />}
        </div>
        
        {/* متن پیام */}
        <div className={`p-3 rounded-2xl ${
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

// ✅ کامپوننت فوتر با فرم ارسال
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
    <form onSubmit={onSendMessage} className="p-3 border-t border-gray-200 bg-white flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="پیام خود را بنویسید..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="bg-blue-600 text-white rounded-full p-2 px-4 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="ارسال پیام"
      >
        <FaPaperPlane size={16} />
      </button>
    </form>
  );
}