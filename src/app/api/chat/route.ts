// app/api/chat/route.ts
import { NextRequest } from "next/server";
import OpenAI from "openai";

const api = new OpenAI({
  baseURL: "https://api.aimlapi.com/v1",
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // فرمت کردن پیام‌ها برای AIMLAPI
    const formattedMessages = [
      {
        role: "system",
        content: "تو یک دستیار حرفه‌ای فیلم و سریال هستی. همیشه به فارسی روان و دوستانه پاسخ بده. اگر فیلم یا سریالی را نمی‌شناسی، صادقانه بگو. از اسپویل کردن داستان خودداری کن. پاسخ‌های کوتاه و مفید بده."
      },
      ...messages.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      }))
    ];

    const response = await api.chat.completions.create({
      model: "google/gemini-3-5-flash",
      messages: formattedMessages,
      stream: true,
      temperature: 0.7,
      max_tokens: 800,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("AIMLAPI Error:", error);
    
    if (error.status === 503) {
      return new Response("سرور هوش مصنوعی در حال حاضر شلوغ است. لطفاً چند لحظه دیگر تلاش کنید.", { status: 503 });
    }
    
    return new Response("خطا در ارتباط با هوش مصنوعی", { status: 500 });
  }
}