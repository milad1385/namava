import Filter from "@/src/components/templates/search/Filter";
import MoviesSection from "@/src/components/templates/search/MoviesSection";
import SearchBox from "@/src/components/templates/search/Search";
import { getAllSubcategories, searchMovies } from "@/src/libs/service/services";
import { TSearchParams } from "@/src/libs/types";
import { formateData } from "@/src/utils/funcs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "جستجو کنید",
  description:
    "در این صفحه امکان جستجو ، فیلتر کردن و مرتب سازی تمام فیلم و سریال های داخل سایت میباشد",
  keywords: "سرچ ، جستجو ، فیلتر ، مرتب سازی",
};

async function SearchPage({ searchParams }: TSearchParams) {
  const [movies, categories]: any = await Promise.all([
    searchMovies(
      searchParams?.q ?? "",
      searchParams?.type,
      searchParams?.genre,
      searchParams?.voice,
      searchParams?.country,
      searchParams?.order,
      { from: searchParams?.from, to: searchParams?.to },
      false,
      1,
      18,
    ),
    getAllSubcategories(),
  ]);

  const formatedCategories = categories.map((category: any) => ({
    id: String(category._id),
    name: category.title,
  }));

  return (
    <div className="flex container pt-24 pb-20 gap-x-8 min-h-screen text-white">
      <Filter
        categories={JSON.parse(JSON.stringify(formatedCategories))}
        className="hidden md:block"
      />
      <div className="w-full  md:mr-[350px]">
        <SearchBox
          categories={JSON.parse(JSON.stringify(formatedCategories))}
          movies={JSON.parse(JSON.stringify(movies))}
          q={searchParams?.q}
        />

        <MoviesSection movies={formateData(movies)} />
      </div>
    </div>
  );
}

export default SearchPage;
