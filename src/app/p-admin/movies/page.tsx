import Search from "@/src/components/modules/p-admin/Search";
import Title from "@/src/components/modules/p-admin/Title";
import AddNewFilm from "@/src/components/templates/p-admin/film/AddNewFilm";
import FilmList from "@/src/components/templates/p-admin/film/FilmList";
import {
  getAllMovies,
  getAllSubcategories,
  getStars,
} from "@/src/libs/service/services";
import { TAdminPage } from "@/src/libs/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "فیلم و سریال ها",
  description: "از این صفحه میتوان برای مدیریت فیلم و سریال  ها استفاده کرد",
};

async function MoviesPage({ searchParams }: TAdminPage) {
  const [allStarts, allSubCategories, movies]: any = await Promise.all([
    getStars(),
    getAllSubcategories(),
    getAllMovies(+searchParams.page, searchParams.q),
  ]);

  return (
    <div>
      <Title name="ایجاد فیلم و سریال" />
      <AddNewFilm
        subCategories={JSON.parse(JSON.stringify(allSubCategories))}
        stars={JSON.parse(JSON.stringify(allStarts))}
      />
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-3">
        <Title name="لیست فیلم و سریال ها" />
        <Search />
      </div>
      <FilmList
        movies={JSON.parse(JSON.stringify(movies.allMovies))}
        counts={movies.counts}
      />
    </div>
  );
}

export default MoviesPage;
