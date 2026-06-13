"use client";
import { ICategory } from "@/src/libs/types";
import CategoryCard from "../category/CategoryCard";
import { useState } from "react";
import Titles from "./Titles";
import ButtonSpinner from "../../modules/spinner/ButtonSpinner";

function Recommends({ categories }: { categories: ICategory[] }) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleSelectGenre = (category: ICategory) => {
    setSelectedGenres((prev) => {
      if (prev.includes(category._id)) {
        return prev.filter((item) => item !== category._id);
      }

      if (prev.length < 3) {
        return [...prev, category._id];
      }

      return prev;
    });
  };

  const getRecommendationsFromAI = async () => {
    if (!selectedGenres.length) {
      setError("لطفاً یک ژانر را انتخاب کنید");
      return;
    }

    setIsLoading(true);

    setRecommendations([]);
    setError("");
    setAiResponse("");

    try {
      const response = await fetch("/api/recommendations/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genres: selectedGenres }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setRecommendations(data.movies);
        setAiResponse(data.aiMessage);
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Titles />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`${selectedGenres.includes(category._id) ? "ring-2 ring-white ring-offset-1 rounded-md" : ""}`}
            onClick={() => handleSelectGenre(category)}
          >
            <CategoryCard image={category.image} title={category.title} />
          </div>
        ))}
      </div>
      <div className="text-center my-8">
        <button
          onClick={getRecommendationsFromAI}
          disabled={!selectedGenres || isLoading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <ButtonSpinner />
              هوش مصنوعی در حال تحلیل فیلم‌ها...
            </span>
          ) : (
            "دریافت پیشنهاد از هوش مصنوعی 🤖"
          )}
        </button>
      </div>

      {aiResponse && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🤖</span>
            <h3 className="font-semibold text-lg text-blue-800">
              گفتگوی هوش مصنوعی:
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{aiResponse}</p>
        </div>
      )}

      {/* نمایش فیلم‌های پیشنهادی */}
      {recommendations?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-right border-b pb-3">
            🎥 فیلم‌های پیشنهادی هوش مصنوعی
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((movie, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 h-48 flex items-center justify-center">
                  <span className="text-6xl">🎬</span>
                </div>
                <div className="p-4 text-right">
                  <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-2 text-sm">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {movie.genre}
                    </span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      {movie.year}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-yellow-500">⭐ {movie.rating}</span>
                    <span className="text-gray-500 text-sm">
                      {movie.director}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {movie.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommends;
