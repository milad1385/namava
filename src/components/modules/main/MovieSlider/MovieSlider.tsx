"use client";
import { TMovieSlider } from "@/src/libs/types";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieSlide from "./MovieSlide";
import PreviewBox from "./PreviewBox";
import SliderTitle from "./SiderTitle";

function MovieSlider({
  title,
  link,
  movies,
  userBookmarks,
  user,
}: TMovieSlider) {
  const [movieId, setMovieId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetail, setMovieDetail] = useState<any>(null);
  const pathname = usePathname();
  const isRecommendation = pathname.includes("/recommends");

  return (
    <div>
      <div className="container mb-[35px] md:mb-0 md:mt-5">
        <SliderTitle title={title} link={link} />
        <div className="mt-10 md:h-[21rem]">
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            autoplay={true}
            className="mySwiper"
            modules={[Navigation, Autoplay]}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              568: {
                slidesPerView: 3,
              },
              800: {
                slidesPerView: 3,
              },
              1260: {
                slidesPerView: 7,
              },
            }}
          >
            {movies.map((movie: any) => (
              <SwiperSlide key={movie._id}>
                <MovieSlide
                  movie={movie}
                  movieId={movieId}
                  setMovieDetail={setMovieDetail}
                  setMovieId={setMovieId}
                  setIsLoading={setIsLoading}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {movieId && (
        <PreviewBox
          movieDetail={movieDetail}
          user={user}
          userBookmarks={userBookmarks}
          isRecommendation={isRecommendation}
          movieId={movieId}
          loading={isLoading}
        />
      )}
    </div>
  );
}

export default MovieSlider;
