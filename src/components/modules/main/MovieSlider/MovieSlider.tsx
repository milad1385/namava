"use client";
import { addOrDeleteBookmark } from "@/src/libs/actions/bookmark";
import { dislikeMovie, likeMovie } from "@/src/libs/actions/movie";
import { TMovieSlider } from "@/src/libs/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
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
  const [movieDetail, setMovieDetail] = useState<any>(null);
  const [episodeId, setEpisodeId] = useState("");
  const [bookmarks, setBookmarks] = useState(userBookmarks);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const previewBoxRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (movieId && previewBoxRef.current) {
      previewBoxRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [movieId]);

  useEffect(() => {
    const getSeriesEpisode = async () => {
      if (movieDetail?.type !== "series") return false;
      const res = await fetch(`/api/episode/${movieId}`);
      const episode = await res.json();
      setEpisodeId(episode._id);
    };

    getSeriesEpisode();
  }, [movieId]);

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
              <SwiperSlide key={movie._id}>
                <MovieSlide
                  movie={movie}
                  movieId={movieId}
                  setMovieDetail={setMovieDetail}
                  setMovieId={setMovieId}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {movieId && (
        <div ref={previewBoxRef}>
          <PreviewBox
            bookmarks={bookmarks}
            disliked={disliked}
            handleAddToBookmark={handleAddToBookmark}
            handleDislike={handleDislike}
            handleLike={handleLike}
            handleRemoveFromBookmark={handleRemoveFromBookmark}
            liked={liked}
            movieDetail={movieDetail}
            episodeId={episodeId}
          />
        </div>
      )}
    </div>
  );
}

export default MovieSlider;
