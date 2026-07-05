"use client";
import Session from "@/src/components/templates/session/Session";
import { useAuth } from "@/src/context/AuthContextProvider";

function SeriesEpisode({ movie, seasonEpisodes, userInfo, link }) {
  const { activeProfile } = useAuth();

  return (
    !activeProfile?.limitsMovies?.includes(movie._id) && (
      <section className="container mb-20 grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {seasonEpisodes.episodes.map((episode: any) => (
          <Session
            key={episode._id}
            episode={episode}
            user={userInfo._id}
            link={link}
            info={movie}
            isKid
          />
        ))}
      </section>
    )
  );
}

export default SeriesEpisode;
