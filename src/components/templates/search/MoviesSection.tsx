import SearchMovie from "@/src/icons/SearchMovie";
import React from "react";
import Movie from "../../modules/main/Movie/Movie";

function MoviesSection({ movies }) {
  return movies.length > 0 ? (
    <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-16 pt-10">
      {movies.map((movie: any) => (
        <Movie
          key={movie._id}
          image={movie.mainImage}
          link={movie.link}
          title={movie.title}
          type={movie.type}
          showTime={movie.showTime}
          contentType={"adult"}
          isLink
          language={movie.language}
          category={movie.category.title}
        />
      ))}
    </div>
  ) : (
    <div className="flex-center flex-col gap-y-4 mt-10">
      <SearchMovie />
      <p className="text-[#bab8b8] max-w-[400px] text-sm/6 text-center px-[18px]">
        عنوان فیلم، سریال یا بازیگر مورد نظر خود را جستجو کنید و یا از طریق
        فیلتر‌های موجود، فیلم و سریال مورد علاقه خود را پیدا کنید.
      </p>
    </div>
  );
}

export default MoviesSection;
