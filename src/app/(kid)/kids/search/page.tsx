import Movie from "@/src/components/modules/main/Movie/Movie";
import EmptySearch from "@/src/components/templates/search/EmptySearch";
import Filter from "@/src/components/templates/search/Filter";
import SearchBox from "@/src/components/templates/search/Search";
import { getAllSubcategories, searchMovies } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "جستجو کنید",
  description:
    "در این صفحه امکان جستجو ، فیلتر کردن و مرتب سازی تمام فیلم و سریال های داخل سایت میباشد",
  keywords: "سرچ ، جستجو ، فیلتر ، مرتب سازی",
};

async function SearchPage({ searchParams }: TParams) {
  const { q, type, genre, voice, country, order, from, to } = searchParams;
  const [movies, categories]: any = await Promise.all([
    searchMovies(
      (q) ?? "",
      type,
      genre,
      voice,
      country,
      order,
      {
        from,
        to,
      },
      true,
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
          q={q as string}
        />

        {movies.length > 0 ? (
          <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-16 pt-10">
            {movies.map((movie: any) => (
              <Movie
                key={movie._id}
                image={movie.mainImage}
                link={movie.link}
                title={movie.title}
                type={movie.type}
                showTime={movie.showTime}
                contentType={"kid"}
                isLink
              />
            ))}
          </div>
        ) : (
          <EmptySearch />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
