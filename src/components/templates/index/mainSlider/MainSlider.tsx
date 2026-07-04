import MovieSlider from "@/src/components/modules/main/MovieSlider/MovieSlider";
import StarsSlider from "@/src/components/modules/main/StarsSlider/StarsSlider";
import MainSliderSkeleton from "@/src/components/modules/Skeleton/MainSliderSkeleton";
import Slider from "@/src/components/templates/index/Slider/Slider";
import {
  getAllCollectionSlider,
  getAllSlidersMovies,
  getMovies,
  getStars,
  getUserBookmarks,
} from "@/src/libs/service/services";
import { ICategoryGroup, TMainSlider } from "@/src/libs/types";
import { authUser } from "@/src/utils/serverHelper";
import { Suspense } from "react";
import Collections from "../Collections/Collections";
import WatchListSection from "@/src/components/modules/main/WatchHistory/WatchListSection";

async function MainSliderContent({ categoryId, type = null }: TMainSlider) {
  const [slides, allStars, movies, collections, userBookmarks, userInfo]: any =
    await Promise.all([
      getAllSlidersMovies(type, categoryId),
      getStars(),
      getMovies("adult", categoryId, type),
      getAllCollectionSlider("adult"),
      getUserBookmarks(),
      authUser(),
    ]);

  const userMoviesBookmark = userBookmarks.map(
    (bookmark: any) => bookmark.movie._id,
  );

  const moviesData = movies as Record<string, ICategoryGroup>;

  const favGenreTitle = userInfo?.favGenre?.title;
  const userFavMovies =
    favGenreTitle && moviesData
      ? Object.values(moviesData)
          .find((cat: ICategoryGroup) => cat?.title === favGenreTitle)
          ?.movies?.sort(() => Math.random() - 0.5) || []
      : [];

  const watchListType =
    type === null ? "all" : type === "film" ? "film" : "series";

  return (
    <>
      <Slider slides={JSON.parse(JSON.stringify(slides))} />

      <WatchListSection type={watchListType} categoryId={categoryId as string} />
      {!categoryId && userInfo?.favGenre && userFavMovies.length > 0 && (
        <MovieSlider
          movies={JSON.parse(JSON.stringify(userFavMovies))}
          userBookmarks={JSON.parse(JSON.stringify(userMoviesBookmark))}
          title={`مورد علاقه شما  ${userInfo?.favGenre?.parrent?.title} - ${userInfo?.favGenre?.title}`}
          user={JSON.parse(JSON.stringify(userInfo))}
          link={`/movie/all/${userInfo?.favGenre?.parrent?._id}`}
        />
      )}

      {Object.values(movies).map((category: any) => {
        const parentTitle = category?.parrent?.title || "";
        const categoryTitle = category?.title || "دسته‌بندی نشده";
        const displayTitle = parentTitle
          ? `${parentTitle} - ${categoryTitle}`
          : categoryTitle;

        return (
          <div key={category._id} className="text-white">
            <MovieSlider
              movies={JSON.parse(JSON.stringify(category.movies))}
              userBookmarks={JSON.parse(JSON.stringify(userMoviesBookmark))}
              title={displayTitle}
              user={JSON.parse(JSON.stringify(userInfo))}
              link={`/movie/all/${category?.parrent?._id}`}
            />
          </div>
        );
      })}

      <StarsSlider allStars={allStars} title="ستارگان" />
      <Collections
        collections={JSON.parse(JSON.stringify(collections))}
        title="مجموعه فیلم ها"
      />
    </>
  );
}

function MainSlider(props: TMainSlider) {
  return (
    <Suspense fallback={<MainSliderSkeleton />}>
      <MainSliderContent {...props} />
    </Suspense>
  );
}

export default MainSlider;
