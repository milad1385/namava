import MovieSlider from "@/src/components/modules/main/MovieSlider/MovieSlider";
import StarsSlider from "@/src/components/modules/main/StarsSlider/StarsSlider";
import Comments from "@/src/components/templates/Comments/Comments";
import Details from "@/src/components/templates/Movie/Details";
import Header from "@/src/components/templates/index/Header/Header";
import {
  checkUserSubscription,
  getMovie,
  getRealedMovies,
  getRelatedArticleToMovie,
  getUserBookmarks,
} from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { authUser } from "@/src/utils/serverHelper";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

async function page({ params }: TParams) {
  const [movie, userInfo, userBookmarks, subscription]: any = await Promise.all(
    [
      getMovie(params.link),
      authUser(),
      getUserBookmarks(),
      checkUserSubscription(),
    ]
  );

  const [realatedMovies, relatedArticle]: any = await Promise.all([
    getRealedMovies(movie.category, movie._id),
    getRelatedArticleToMovie(movie._id),
  ]);

  const userMoviesBookmark = userBookmarks.map(
    (bookmark: any) => bookmark.movie._id
  );

  if (!movie) {
    notFound();
  }

  return (
    <>
      <section className="relative">
        <Header
          isImage={true}
          isTitle
          img={movie.deskBanner}
          mobileImage={movie.mobileBanner}
          info={JSON.parse(JSON.stringify(movie))}
          subscription={subscription}
          bookmarks={JSON.parse(JSON.stringify(userMoviesBookmark))}
          user={JSON.parse(JSON.stringify(userInfo))}
        />
        <div className="absolute inset-0 title-overlay"></div>
      </section>
      <section className="text-white mt-16 md:mt-6 container relative bottom-16 md:bottom-24 z-20 space-y-6">
        <Details info={movie} article={relatedArticle} />
      </section>

      <section className="text-white">
        <StarsSlider
          allStars={JSON.parse(JSON.stringify(movie.actors))}
          title={`بازیگران فیلم ${movie.title}`}
        />
        {/* <StarsSlider title="عوامل فیلم هاوایی" /> */}
        {realatedMovies.length > 0 && (
          <MovieSlider
            movies={JSON.parse(JSON.stringify(realatedMovies))}
            title={`بر اساس ${movie.title}`}
            link="/"
            userBookmarks={JSON.parse(JSON.stringify(userMoviesBookmark))}
            user={JSON.parse(JSON.stringify(userInfo))}
          />
        )}
      </section>

      <section className="pb-20">
        <Comments
          user={userInfo ? JSON.parse(JSON.stringify(userInfo._id)) : null}
          movieId={JSON.parse(JSON.stringify(movie._id))}
          comments={JSON.parse(JSON.stringify(movie.comments))}
          movieLink={movie.link}
        />
      </section>
    </>
  );
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const movie : any = await  getMovie(params.link);
  return {
    title: `${movie.title}`,
    description: `${movie.shortDesc}`,
    keywords:`فیلم ، سریال ، نماوا ، ${movie.title}`,
  };
}

export default page;
