// app/api/recommendations/ai/route.ts
import { NextRequest } from "next/server";
import MovieModel from "@/src/models/movie";
import CategoryModel from "@/src/models/category";

export async function POST(req: NextRequest) {
  try {
    const { genres } = await req.json();

    if (!genres?.length) {
      return Response.json(
        { error: "لطفاً ژانر را انتخاب کنید" },
        { status: 400 },
      );
    }

    let categories = [];
    for (const genre of genres) {
      const category = await CategoryModel.findById(genre).lean();
      if (!category) continue;

      const subCategories = await CategoryModel.find({ parrent: genre }).lean();

      categories.push({
        ...category,
        subCategories: subCategories,
      });
    }

    const allSubCategories = categories.flatMap((cat) => cat.subCategories);
    const subCategoryTitles = allSubCategories.map((sub) => sub.title);

    if (subCategoryTitles.length === 0) {
      return Response.json({
        movies: [],
        aiMessage:
          "متأسفانه هیچ فیلمی در ژانر مورد علاقه شما یافت نشد. لطفاً ژانر های دیگر را تست کنید ، به زودی مجموعه فیلم و سریال آپدیت می شود.",
      });
    }

    let movies = await MovieModel.find({})
      .populate("category", "title -_id")
      .select("title showTime IMDB director longDesc category")
      .lean();

    const allMovies = await MovieModel.find({})
      .populate("category", "title -_id")
      .lean();

    const formattedMovies = movies.map((movie: any) => ({
      title: movie.title,
      genre: movie.category?.title || "نامشخص",
      IMDB: movie.IMDB || 0,
      year: movie.showTime,
      director: movie.director,
      description: movie.longDesc?.substring(0, 150) || "",
    }));

    const filteredMovies = formattedMovies.filter((movie) =>
      subCategoryTitles.includes(movie.genre),
    );

    const filtredAllMovies = allMovies.filter((movie) =>
      subCategoryTitles.includes(movie.category.title),
    );

    if (filteredMovies.length === 0) {
      return Response.json({
        movies: [],
        aiMessage: `✨ متأسفانه در حال حاضر فیلمی در ژانر‌های "${subCategoryTitles.join("، ")}" در سایت موجود نیست. لطفاً ژانرهای دیگری را انتخاب کنید.`,
      });
    }

    const sortedMovies = [...filteredMovies].sort((a, b) => b.IMDB - a.IMDB);
    const topMovies = sortedMovies;

    const sortedAllMovies = [...filtredAllMovies].sort(
      (a, b) => b.IMDB - a.IMDB,
    );
    const topAllMovies = [...sortedAllMovies].filter(
      (movie) => movie.type === "film",
    );

    const topAllSeries = [...sortedAllMovies].filter(
      (movie) => movie.type === "series",
    );

    const mainGenre = subCategoryTitles.slice(0, 3).join("، ");

    let aiMessage = "";
    try {
      const aiPrompt = `
تو یک دستیار حرفه‌ای فیلم و سریال هستی.

لیست فیلم‌های موجود در سایت ما در ژانر "${mainGenre}":
${topMovies.map((m) => `- ${m.title} (${m.year}) - کارگردان: ${m.director} - امتیاز: ${m.IMDB}`).join("\n")}

لطفاً یک پیام دوستانه و جذاب (حداکثر ۲ خط) برای کاربر بنویس که:
1. بهش بگی چه فیلم‌هایی در این ژانر داری
2. بهترین فیلم رو معرفی کن
3. پاسخ کاملاً فارسی و روان باشد
`;

      const aiResponse = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "poolside/laguna-m.1:free",
            messages: [
              {
                role: "system",
                content:
                  "تو یک دستیار فیلم و سریال هستی. پاسخ‌های کوتاه و مفید بده.",
              },
              { role: "user", content: aiPrompt },
            ],
            max_tokens: 200,
            temperature: 0.7,
          }),
        },
      );

      const aiData = await aiResponse.json();
      
      aiMessage =
      aiData.choices?.[0]?.message?.content ||
      `✨ بهترین فیلم ها و سریال های ژانر های ${mainGenre}  شامل این فیلم ها می شود : ${topMovies.map((m) => m.title).join("    ،    ")}. پیشنهاد ویژه من "${topMovies[0]?.title}" است! 🎬`;
    } catch (aiError) {
      console.error("AI Error:", aiError);
      aiMessage = `✨ فیلم ها و سریال های ژانر "${mainGenre}": ${topMovies.map((m) => m.title).join("، ")}. پیشنهاد ویژه من "${topMovies[0]?.title}" است! 🎬`;
    }

    return Response.json({
      movies: topMovies,
      aiMessage: aiMessage,
      total: filteredMovies.length,
      allMovies: topAllMovies,
      allSeries: topAllSeries,
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "خطا در دریافت فیلم‌ها" }, { status: 500 });
  }
}
