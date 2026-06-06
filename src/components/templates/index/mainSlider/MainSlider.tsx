import StarsSlider from "@/src/components/modules/main/StarsSlider/StarsSlider";
import React from "react";
import Collections from "../Collections/Collections";
import MovieSlider from "@/src/components/modules/main/MovieSlider/MovieSlider";
import {
  getAllCollectionSlider,
  getMovies,
  getStars,
  getUserBookmarks,
} from "@/src/libs/service/services";
import { authUser } from "@/src/utils/serverHelper";
import { TMainSlider } from "@/src/libs/types";

async function MainSlider({ categoryId, type }: TMainSlider) {
  const [allStars, movies, collections, userBookmarks, userInfo]: any =
    await Promise.all([
      getStars(),
      getMovies("adult", categoryId, type),
      getAllCollectionSlider("adult"),
      getUserBookmarks(),
      authUser(),
    ]);

  const userMoviesBookmark = userBookmarks.map(
    (bookmark: any) => bookmark.movie._id
  );
  return (
    <div className="text-white">
      {Object.keys(movies).map(async (category, index) => {
        return (
          <div key={category}>
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
    </div>
  );
}

export default MainSlider;
