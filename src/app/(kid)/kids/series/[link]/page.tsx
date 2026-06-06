import MovieSlider from "@/src/components/modules/main/MovieSlider/MovieSlider";
import StarsSlider from "@/src/components/modules/main/StarsSlider/StarsSlider";
import Comments from "@/src/components/templates/Comments/Comments";
import Details from "@/src/components/templates/Movie/Details";
import SeasonOption from "@/src/components/templates/Movie/SeasonOption";
import Header from "@/src/components/templates/index/Header/Header";
import Session from "@/src/components/templates/session/Session";
import {
  checkUserSubscription,
  getMovie,
  getRealedMovies,
  getSpecificSeasons,
  getUserBookmarks,
} from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { authUser } from "@/src/utils/serverHelper";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaYoutube } from "react-icons/fa6";

async function page({ params, searchParams }: TParams) {
  const activeSeason = searchParams?.season ?? 1;

  const [movie, userInfo]: [movie: any, userInfo: any] = await Promise.all([
    getMovie(params.link),
    authUser(),
  ]);

  const [seasons, realatedMovies, userBookmarks, subscription]: any =
    await Promise.all([
      getSpecificSeasons(movie._id),
      getRealedMovies(movie.category, movie._id , movie.contentType),
      getUserBookmarks(),
      checkUserSubscription(),
    ]);

  const userMoviesBookmark = userBookmarks.map(
    (bookmark: any) => bookmark.movie._id
  );

  const seasonEpisodes = seasons.find(
    (season: any) => season.seasonNumber == activeSeason
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
          subscription={JSON.parse(JSON.stringify(subscription))}
          bookmarks={JSON.parse(JSON.stringify(userMoviesBookmark))}
          user={JSON.parse(JSON.stringify(userInfo))}
          isKid
        />
        <div className="absolute inset-0 title-overlay"></div>
      </section>
      {/* season of Season */}
      <section className="mt-14 container flex flex-col gap-y-4 md:flex-row md:items-center gap-x-4 relative bottom-6 md:bottom-28 z-20 space-y-6">
        <SeasonOption seasons={JSON.parse(JSON.stringify(seasons))} />
        <div className="bg-namavaBlack rounded-md flex items-center gap-x-2 py-2 px-3 text-white text-xs md:text-sm !mt-0">
          <div className="flex items-center gap-x-2">
            <FaYoutube className="text-2xl" />
            <p>تعداد فصل ها : {movie.season}</p>
          </div>
          <span className="block w-px h-4 bg-slate-500"></span>
          <div>
            <p>وضعیت : پایان فصل {seasons.length}</p>
          </div>
        </div>
      </section>

      <section className="container mb-20 grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {seasonEpisodes.episodes.map((episode: any) => (
          <Session
            key={episode._id}
            episode={JSON.parse(JSON.stringify(episode))}
            user={JSON.parse(JSON.stringify(userInfo._id))}
            link={params.link}
            isKid
          />
        ))}
      </section>

      <section className="text-white">
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
          isKid
        />
      </section>
    </>
  );
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const movie: any = await getMovie(params.link);
  return {
    title: `سریال ${movie.title}`,
    description: `${movie.shortDesc}`,
    keywords: `فیلم ، سریال ، نماوا ، ${movie.title}`,
  };
}

export default page;
