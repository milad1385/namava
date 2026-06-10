// app/api/chat/route.ts
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nex-agi/nex-n2-pro:free",
        messages: [
          {
            role: "system",
            content: `تو یک دستیار تخصصی فیلم و سریال هستی.
                     فقط به سوالات مرتبط با فیلم، سریال، بازیگران، کارگردان‌ها، ژانرها، نقد و بررسی، و پیشنهاد فیلم پاسخ بده.
                     اگر سوال در مورد موضوعات دیگر بود، بگو: "متاسفانه تخصص من فقط فیلم و سریال است."
                     همیشه به فارسی روان و مختصر پاسخ بده.`
          },
          ...messages
        ],
        stream: false,  // موقتاً استریم رو خاموش می‌کنیم برای دیباگ
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    // گرفتن متن خام پاسخ
    const rawText = await response.text();
    
    // بررسی اینکه آیا پاسخ JSON است یا خیر
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error("پاسخ JSON معتبر نیست:", rawText);
      return new Response("خطا در ارتباط با هوش مصنوعی: پاسخ سرور معتبر نیست", { status: 500 });
    }

    // بررسی خطاهای OpenRouter
    if (data.error) {
      console.error("OpenRouter error:", data.error);
      return new Response(`خطا: ${data.error.message || "مشخص نیست"}`, { status: 500 });
    }

    const reply = data.choices?.[0]?.message?.content || "پاسخی دریافت نشد";

    return new Response(reply, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("خطا در ارتباط با سرور", { status: 500 });
  }
}