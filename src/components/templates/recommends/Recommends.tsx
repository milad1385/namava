"use client";
import { ICategory } from "@/src/libs/types";
import CategoryCard from "../category/CategoryCard";
import { useState } from "react";
import Titles from "./Titles";
import ButtonSpinner from "../../modules/spinner/ButtonSpinner";
import toast from "react-hot-toast";
import MovieSlider from "../../modules/main/MovieSlider/MovieSlider";
import Spinner from "../../modules/spinner/Spinner";
import { FaFilm } from "react-icons/fa6";
import { LuPopcorn } from "react-icons/lu";

function Recommends({ categories }: { categories: ICategory[] }) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState(null);
  const [seriesRecommendation, setSeriesRecommendation] = useState(null);
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
      toast.error("حداقل یک ژانر را انتخاب کنید");
      return;
    }

    setIsLoading(true);

    setRecommendations([]);
    setSeriesRecommendation([]);
    setError("");
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
        setRecommendations(data.allMovies);
        setSeriesRecommendation(data.allSeries);
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
          className="bg-gradient-to-r w-[285px] h-[44px] md:w-[350px] md:h-[60px] from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl text-sm md:text-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
        >
          {isLoading ? (
            <span className="flex items-center gap-2 text-sm md:text-lg">
              هوش مصنوعی در حال تحلیل
              <Spinner />
            </span>
          ) : (
            "دریافت پیشنهاد از هوش مصنوعی"
          )}
        </button>
      </div>

      {aiResponse && (
        <div className="bg-milafilmBlack  rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🤖</span>
            <h3 className="font-semibold text-base md:text-lg text-milafilm">
              گفتگوی هوش مصنوعی:
            </h3>
          </div>
          <p className="text-gray-100 text-justify text-sm/[28px] md:text-base/[34px]">
            {aiResponse}
          </p>
        </div>
      )}

      {recommendations?.length > 0 && (
        <div className="md:p-6 mt-10">
          <div className="flex items-center gap-x-3 md:gap-x-4 border-b border-white">
            <FaFilm className="text-xl md:text-2xl mb-10" />
            <h2 className="text-base md:text-2xl font-bold mb-6 text-right  pb-4">
              فیلم‌های پیشنهادی هوش مصنوعی
            </h2>
          </div>

          <MovieSlider
            movies={recommendations}
            userBookmarks={[]}
            title=""
            user={null}
          />
        </div>
      )}
      {seriesRecommendation?.length > 0 && (
        <div className="md:p-6 mt-10">
          <div className="flex items-center gap-x-3 md:gap-x-4 border-b border-white">
            <LuPopcorn className="text-xl md:text-2xl mb-10" />
            <h2 className="text-base md:text-2xl font-bold mb-6 text-right  pb-4">
              سریال های پیشنهادی هوش مصنوعی
            </h2>
          </div>

          <MovieSlider
            movies={seriesRecommendation}
            userBookmarks={[]}
            title=""
            user={null}
          />
        </div>
      )}
    </div>
  );
}

export default Recommends;
