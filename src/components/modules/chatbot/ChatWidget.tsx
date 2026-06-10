"use client";

import { Message } from "@/src/libs/types";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import Header from "./Header";

export default function ChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
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
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
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

        setMessages((prev) => {
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
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        if (lastIndex >= 0 && newMessages[lastIndex].role === "assistant") {
          newMessages[lastIndex].content =
            "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.";
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
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={onClose}
      />

      <div
        className={`
        fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden
        /* موبایل (کمتر از 768px) */
        inset-x-0 bottom-0 rounded-b-none rounded-t-2xl h-[85vh] w-full
        /* تبلت و دسکتاپ (بیشتر از 768px) */
        md:bottom-24 md:right-6 md:inset-auto md:rounded-b-2xl md:h-[550px] md:w-[380px]
        animate-in slide-in-from-bottom-5 duration-300
      `}
      >
        <Header onClose={onClose} />

        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
        >
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
