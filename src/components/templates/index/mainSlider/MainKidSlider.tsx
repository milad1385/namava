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
        {Object.values(movies).map((category: any) => {
          const parentTitle = category?.parrent?.title || "";
          const categoryTitle = category?.title || "دسته‌بندی نشده";
          const displayTitle = parentTitle
            ? `${parentTitle} - ${categoryTitle}`
            : categoryTitle;

          return (
            <div key={category._id}>
              <MovieSlider
                movies={JSON.parse(JSON.stringify(category.movies || []))}
                userBookmarks={[]}
                title={displayTitle}
                user={null}
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