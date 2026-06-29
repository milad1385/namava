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
import { TMainSlider } from "@/src/libs/types";
import { authUser } from "@/src/utils/serverHelper";
import { Suspense } from "react";
import Collections from "../Collections/Collections";
import WatchListSection from "@/src/components/modules/main/WatchHistory/WatchListSection";

async function MainSliderContent({ categoryId, type }: TMainSlider) {
  const [slides, allStars, movies, collections, userBookmarks, userInfo]: any =
    await Promise.all([
      getAllSlidersMovies(),
      getStars(),
      getMovies("adult", categoryId, type),
      getAllCollectionSlider("adult"),
      getUserBookmarks(),
      authUser(),
    ]);

  const userMoviesBookmark = userBookmarks.map(
    (bookmark: any) => bookmark.movie._id,
  );

  const userFavMovies = [...(movies?.[userInfo?.favGenre?.title] || [])].sort(
    () => Math.random() - 0.5,
  );

  return (
    <>
      <Slider slides={JSON.parse(JSON.stringify(slides))} />

      <WatchListSection categoryId={categoryId as string} />
      {!categoryId && userInfo?.favGenre && (
        <MovieSlider
          movies={JSON.parse(JSON.stringify(userFavMovies))}
          userBookmarks={JSON.parse(JSON.stringify(userMoviesBookmark))}
          title={`مورد علاقه شما - ${userInfo?.favGenre?.title}`}
          user={JSON.parse(JSON.stringify(userInfo))}
        />
      )}

      {Object.keys(movies).map((category) => {
        return (
          <div key={category} className="text-white">
            <MovieSlider
              movies={JSON.parse(JSON.stringify(movies[category]))}
              userBookmarks={JSON.parse(JSON.stringify(userMoviesBookmark))}
              title={`${category}`}
              user={JSON.parse(JSON.stringify(userInfo))}
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
