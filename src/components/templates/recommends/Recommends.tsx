"use client";
import { ICategory } from "@/src/libs/types";
import CategoryCard from "../category/CategoryCard";
import { useState } from "react";
import Titles from "./Titles";
import ButtonSpinner from "../../modules/spinner/ButtonSpinner";

function Recommends({ categories }: { categories: ICategory[] }) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectGenre = (category: ICategory) => {
    setSelectedGenres((prev) => {
      if (prev.includes(category.title)) {
        return prev.filter((item) => item !== category.title);
      }

      if (prev.length < 3) {
        return [...prev, category.title];
      }

      return prev;
    });
  };
  return (
    <div>
      <Titles />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((category) => (
          <div
            className={`${selectedGenres.includes(category.title) ? "ring-2 ring-white ring-offset-1 rounded-md" : ""}`}
            onClick={() => handleSelectGenre(category)}
          >
            <CategoryCard
              key={category._id}
              image={category.image}
              title={category.title}
            />
          </div>
        ))}
      </div>
      <div className="text-center my-8">
        <button
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
    </div>
  );
}

export default Recommends;
