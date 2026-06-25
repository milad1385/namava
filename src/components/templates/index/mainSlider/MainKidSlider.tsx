import MovieSlider from "@/src/components/modules/main/MovieSlider/MovieSlider";
import KidMovieSliderSkeleton from "@/src/components/modules/Skeleton/KidMovieSliderSkeleton";
import AnimsSlider from "@/src/components/templates/kid/AnimSlider/AnimsSlider";
import { getAllCollectionSlider, getMovies } from "@/src/libs/service/services";
import { Suspense } from "react";

async function KidsContent() {
  const [collections, movies] = await Promise.all([
    getAllCollectionSlider("kid"),
    getMovies("kid"),
  ]);

  return (
    <div>
      <AnimsSlider collections={JSON.parse(JSON.stringify(collections))} />
      <div className="space-y-12">
        {Object.keys(movies).map((category) => {
          const movieData = JSON.parse(JSON.stringify(movies[category]));
          return (
            <div key={category}>
              <MovieSlider
                movies={movieData}
                userBookmarks={[]}
                title={`${category}`}
                user={[]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MainKidSlider() {
  return (
    <Suspense fallback={<KidMovieSliderSkeleton/>}>
      <KidsContent />
    </Suspense>
  );
}

export default MainKidSlider;
