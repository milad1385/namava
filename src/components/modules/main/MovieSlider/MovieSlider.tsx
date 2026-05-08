"use client";
import { addOrDeleteBookmark } from "@/src/libs/actions/bookmark";
import { dislikeMovie, likeMovie } from "@/src/libs/actions/movie";
import { TMovieSlider } from "@/src/libs/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Movie from "../Movie/Movie";
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
  const [movieDetail, setMovieDetail] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState(userBookmarks);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const handleAddToBookmark = async () => {
    setBookmarks([...bookmarks, movieId]);
    toast.success(`با موفقیت اضافه شد`);
    await addOrDeleteBookmark(movieId);
  };

  const handleRemoveFromBookmark = async () => {
    setBookmarks(bookmarks.filter((id: string) => id !== movieId));
    toast.success(`با موفقیت حذف شد`);
    await addOrDeleteBookmark(movieId);
  };

  const handleDislike = async (id: string) => {
    if (!user) {
      router.push("/login");
    }

    setDisliked(!disliked);

    const res = await dislikeMovie(id, user._id, movieDetail.link);
    if (res.status === 200) {
      toast.success(`${res.message}`);
    }

    if (liked) setLiked(false);
  };

  const handleLike = async (id: string) => {
    if (!user) {
      router.push("/login");
    }
    setLiked(!liked);
    const res = await likeMovie(id, user._id, movieDetail.link);

    if (res.status === 200) {
      toast.success(`${res.message}`);
    }
    if (disliked) setDisliked(false);
  };

  useEffect(() => {
    setLiked(movieDetail?.liked?.includes(user?._id));
    setDisliked(movieDetail?.dislike?.includes(user?._id));
  }, [movieDetail]);

  return (
    <div>
      <div className="container mt-[20px]">
        <SliderTitle title={title} link={link} key={crypto.randomUUID()} />
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
                spaceBetween: 10,
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
              <SwiperSlide
                key={movie._id}
                onClick={() => {
                  if (pathname.includes("/kids")) {
                    return router.push(
                      `/kids/${movie.type === "film" ? "movie" : "series"}/${
                        movie.link
                      }`,
                    );
                  }
                  setMovieId(movie._id);
                  setMovieDetail(movie);
                }}
                className="movie-slide"
              >
                <div
                  className={`transition-all group ${
                    movieId === movie._id ? "md:pt-[20px]" : ""
                  }`}
                >
                  <Movie
                    image={movie.mainImage}
                    link={movie.link}
                    title={movie.title}
                    type={movie.type}
                    showTime={movie.showTime}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {movieId && (
        <PreviewBox
          bookmarks={bookmarks}
          disliked={disliked}
          handleAddToBookmark={handleAddToBookmark}
          handleDislike={handleDislike}
          handleLike={handleLike}
          handleRemoveFromBookmark={handleRemoveFromBookmark}
          liked={liked}
          movieDetail={movieDetail}
        />
      )}
    </div>
  );
}

export default MovieSlider;
