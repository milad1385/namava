"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaLink, FaTelegram, FaTwitter, FaWhatsapp } from "react-icons/fa6";

function Share({ title, url, description }) {
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: title || document.title,
    text: description || "این محتوا رو ببینید! 🎬",
    url: url || window.location.href,
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const hasShareAPI = typeof navigator.share === "function";

  const handleNativeShare = async () => {
    if (hasShareAPI) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url,
        });
        toast.success("✅ با موفقیت اشتراک‌گذاری شد!");
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.error("خطا در اشتراک‌گذاری");
        }
      }
    } else {
      copyLink();
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      toast.success("✅ لینک کپی شد!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shareData.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      toast.success("✅ لینک کپی شد!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTelegram = () => {
    const message = `
🎬 ${shareData.title}

📌 [برای مشاهده کلیک کنید](${shareData.url})
  `.trim();

    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, "_blank");
  };

  const shareOnWhatsApp = () => {
    const message = `
🎬 ${shareData.title}

📌 ${shareData.url}
  `.trim();

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    const message = `🎬 ${shareData.title}\n\n📌 ${shareData.url}\n\n#فیلم #سریال #میلا_فیلم`;

    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="text-sm flex md:items-center gap-4 flex-col md:flex-row">
      <span className="text-sm font-medium">اشتراک‌گذاری :</span>

      <div className="flex items-center flex-wrap gap-3">
        {isMobile && hasShareAPI && (
          <button
            onClick={handleNativeShare}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2.5 rounded-lg flex items-center gap-2 text-white hover:scale-105 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            اشتراک‌گذاری
          </button>
        )}
        {(!isMobile || !hasShareAPI) && (
          <>
            <button
              onClick={shareOnTelegram}
              className="bg-[#121212] px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#1a1a1a] transition-all duration-200 border border-white/5"
            >
              <FaTelegram className="text-[#0088cc] text-lg" />
              <span className="hidden sm:inline">تلگرام</span>
            </button>

            <button
              onClick={shareOnWhatsApp}
              className="bg-[#121212] px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#1a1a1a] transition-all duration-200 border border-white/5"
            >
              <FaWhatsapp className="text-[#25D366] text-lg" />
              <span className="hidden sm:inline">واتساپ</span>
            </button>

            <button
              onClick={shareOnTwitter}
              className="bg-[#121212] px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#1a1a1a] transition-all duration-200 border border-white/5"
            >
              <FaTwitter className="text-[#1DA1F2] text-lg" />
              <span className="hidden sm:inline">توییتر</span>
            </button>

            <button
              onClick={copyLink}
              className="bg-[#121212] px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#1a1a1a] transition-all duration-200 border border-white/5"
            >
              <FaLink
                className={`text-lg ${copied ? "text-green-500" : "text-[#4CAF50]"}`}
              />
              <span className="hidden sm:inline">
                {copied ? "کپی شد!" : "کپی لینک"}
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Share;
