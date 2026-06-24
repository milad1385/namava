// "use client";
// import { addOrDeleteBookmark } from "@/src/libs/actions/bookmark";
// import { dislikeMovie, likeMovie } from "@/src/libs/actions/movie";
// import { TMovieSlider } from "@/src/libs/types";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Autoplay, Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import MovieSlide from "./MovieSlide";
// import PreviewBox from "./PreviewBox";
// import SliderTitle from "./SiderTitle";

// function MovieSlider({
//   title,
//   link,
//   movies,
//   userBookmarks,
//   user,
// }: TMovieSlider) {
//   const [movieId, setMovieId] = useState<string>("");
//   const [movieDetail, setMovieDetail] = useState<any>(null);
//   const [episodeId, setEpisodeId] = useState("");
//   const [bookmarks, setBookmarks] = useState(userBookmarks);
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);
//   const previewBoxRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();
//   const pathname = usePathname();
//   const isRecommendation = pathname.includes("/recommends");

//   const handleAddToBookmark = async () => {
//     setBookmarks([...bookmarks, movieId]);
//     toast.success(`با موفقیت اضافه شد`);
//     await addOrDeleteBookmark(movieId);
//   };

//   const handleRemoveFromBookmark = async () => {
//     setBookmarks(bookmarks.filter((id: string) => id !== movieId));
//     toast.success(`با موفقیت حذف شد`);
//     await addOrDeleteBookmark(movieId);
//   };

//   const handleDislike = async (id: string) => {
//     if (!user) {
//       router.push("/login");
//     }

//     setDisliked(!disliked);

//     const res = await dislikeMovie(id, user._id, movieDetail.link, true);
//     if (res.status === 200) {
//       toast.success(`${res.message}`);
//     }

//     if (liked) setLiked(false);
//   };

//   const handleLike = async (id: string) => {
//     if (!user) {
//       router.push("/login");
//     }
//     setLiked(!liked);
//     const res = await likeMovie(id, user._id, movieDetail.link, true);

//     if (res.status === 200) {
//       toast.success(`${res.message}`);
//     }
//     if (disliked) setDisliked(false);
//   };

//   useEffect(() => {
//     setLiked(movieDetail?.liked?.includes(user?._id));
//     setDisliked(movieDetail?.dislike?.includes(user?._id));
//   }, [movieId, movieDetail, user?._id]);

//   useEffect(() => {
//     if (movieId && previewBoxRef.current) {
//       previewBoxRef.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   }, [movieId]);

//   useEffect(() => {
//     const getSeriesEpisode = async () => {
//       if (movieDetail?.type !== "series") return false;
//       const res = await fetch(`/api/episode/${movieId}`);
//       const episode = await res.json();
//       setEpisodeId(episode._id);
//     };

//     getSeriesEpisode();
//   }, [movieId, movieDetail?.type]);

//   return (
//     <div>
//       <div className="container mt-[30px] md:mt-5">
//         <SliderTitle title={title} link={link} key={crypto.randomUUID()} />
//         <div className="mt-10 md:h-[21rem]">
//           <Swiper
//             slidesPerView={3}
//             spaceBetween={20}
//             autoplay={true}
//             className="mySwiper"
//             modules={[Navigation, Autoplay]}
//             navigation={true}
//             breakpoints={{
//               0: {
//                 slidesPerView: 3,
//                 spaceBetween: 10,
//               },
//               568: {
//                 slidesPerView: 3,
//               },
//               800: {
//                 slidesPerView: 3,
//               },
//               1260: {
//                 slidesPerView: 7,
//               },
//             }}
//           >
//             {movies.map((movie: any) => (
//               <SwiperSlide key={movie._id}>
//                 <MovieSlide
//                   movie={movie}
//                   movieId={movieId}
//                   setMovieDetail={setMovieDetail}
//                   setMovieId={setMovieId}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//       {movieId && (
//         <div ref={previewBoxRef}>
//           <PreviewBox
//             bookmarks={bookmarks}
//             disliked={disliked}
//             handleAddToBookmark={handleAddToBookmark}
//             handleDislike={handleDislike}
//             handleLike={handleLike}
//             handleRemoveFromBookmark={handleRemoveFromBookmark}
//             liked={liked}
//             movieDetail={movieDetail}
//             episodeId={episodeId}
//             isRecommendation={isRecommendation}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default MovieSlider;

"use client";
import { addOrDeleteBookmark } from "@/src/libs/actions/bookmark";
import { dislikeMovie, likeMovie } from "@/src/libs/actions/movie";
import { TMovieSlider } from "@/src/libs/types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
  const [bookmarks, setBookmarks] = useState<string[]>(userBookmarks || []);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const previewBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isRecommendation = pathname.includes("/recommends");

  // ✅ تابع برای بررسی اینکه آیا movie در بوکمارک هست
  const isBookmarked = useMemo(() => {
    return bookmarks.includes(movieId);
  }, [bookmarks, movieId]);

  // ✅ بوکمارک
  const handleAddToBookmark = useCallback(async () => {
    if (isLoading || !movieId) return;
    setIsLoading(true);

    try {
      const res = await addOrDeleteBookmark(movieId, true);

      if (res.status === 201) {
        // اضافه شدن
        setBookmarks((prev) => [...prev, movieId]);
        toast.success(res.message || "با موفقیت اضافه شد");
      } else if (res.status === 200) {
        // حذف شدن
        setBookmarks((prev) => prev.filter((id: string) => id !== movieId));
        toast.success(res.message || "با موفقیت حذف شد");
      } else {
        toast.error(res.message || "خطا در عملیات");
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  }, [movieId, isLoading]);

  // ✅ لایک
  const handleLike = useCallback(
    async (id: string) => {
      if (!user) {
        router.push("/login");
        return;
      }

      if (isLoading) return;
      setIsLoading(true);

      // ذخیره حالت قبلی برای برگشت در صورت خطا
      const prevLiked = liked;
      const prevDisliked = disliked;

      // به‌روزرسانی UI بلافاصله
      setLiked(!liked);
      if (disliked) setDisliked(false);

      try {
        const res = await likeMovie(id, user._id, movieDetail?.link, true);

        if (res.status === 200) {
          toast.success(res.message);

          // ✅ به‌روزرسانی movieDetail با داده‌های جدید
          if (movieDetail) {
            const updatedDetail = { ...movieDetail };

            if (res.message.includes("حذف")) {
              // حذف از لایک
              updatedDetail.liked =
                updatedDetail.liked?.filter(
                  (uid: string) => uid !== user._id,
                ) || [];
            } else {
              // اضافه به لایک
              updatedDetail.liked = [...(updatedDetail.liked || []), user._id];
              // حذف از دیسلایک اگر بود
              updatedDetail.disliked =
                updatedDetail.disliked?.filter(
                  (uid: string) => uid !== user._id,
                ) || [];
            }

            setMovieDetail(updatedDetail);
          }
        } else {
          // برگشت به حالت قبلی
          setLiked(prevLiked);
          if (prevDisliked) setDisliked(true);
          toast.error(res.message || "خطا در ثبت نظر");
        }
      } catch (error) {
        setLiked(prevLiked);
        if (prevDisliked) setDisliked(true);
        toast.error("خطا در ارتباط با سرور");
      } finally {
        setIsLoading(false);
      }
    },
    [user, liked, disliked, movieDetail, router, isLoading, movieId],
  );

  // ✅ دیسلایک
  const handleDislike = useCallback(
    async (id: string) => {
      if (!user) {
        router.push("/login");
        return;
      }

      if (isLoading) return;
      setIsLoading(true);

      const prevDisliked = disliked;
      const prevLiked = liked;

      setDisliked(!disliked);
      if (liked) setLiked(false);

      try {
        const res = await dislikeMovie(id, user._id, movieDetail?.link, true);

        if (res.status === 200) {
          toast.success(res.message);

          // ✅ به‌روزرسانی movieDetail با داده‌های جدید
          if (movieDetail) {
            const updatedDetail = { ...movieDetail };

            if (res.message.includes("حذف")) {
              // حذف از دیسلایک
              updatedDetail.disliked =
                updatedDetail.disliked?.filter(
                  (uid: string) => uid !== user._id,
                ) || [];
            } else {
              // اضافه به دیسلایک
              updatedDetail.disliked = [
                ...(updatedDetail.disliked || []),
                user._id,
              ];
              // حذف از لایک اگر بود
              updatedDetail.liked =
                updatedDetail.liked?.filter(
                  (uid: string) => uid !== user._id,
                ) || [];
            }

            setMovieDetail(updatedDetail);
          }
        } else {
          setDisliked(prevDisliked);
          if (prevLiked) setLiked(true);
          toast.error(res.message || "خطا در ثبت نظر");
        }
      } catch (error) {
        setDisliked(prevDisliked);
        if (prevLiked) setLiked(true);
        toast.error("خطا در ارتباط با سرور");
      } finally {
        setIsLoading(false);
      }
    },
    [user, liked, disliked, movieDetail, router, isLoading, movieId],
  );

  // ✅ آپدیت stateها از movieDetail
  useEffect(() => {
    if (movieDetail && user?._id) {
      const isLiked = movieDetail?.liked?.includes(user._id) || false;
      const isDisliked = movieDetail?.dislike?.includes(user._id) || false;

      setLiked(isLiked);
      setDisliked(isDisliked);
    }
  }, [movieDetail, user?._id]);

  // ✅ اسکرول
  useEffect(() => {
    if (movieId && previewBoxRef.current) {
      previewBoxRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [movieId]);

  // ✅ گرفتن episode
  useEffect(() => {
    const getSeriesEpisode = async () => {
      if (movieDetail?.type !== "series" || !movieId) return;

      try {
        const res = await fetch(`/api/episode/${movieId}`);
        const episode = await res.json();
        setEpisodeId(episode._id);
      } catch (error) {
        console.error("Error fetching episode:", error);
      }
    };

    getSeriesEpisode();
  }, [movieId, movieDetail?.type]);

  const previewBoxProps = useMemo(
    () => ({
      bookmarks,
      disliked,
      handleAddToBookmark,
      handleDislike,
      handleLike,
      handleRemoveFromBookmark: handleAddToBookmark, // بوکمارک همون تابع رو استفاده میکنه
      liked,
      movieDetail,
      episodeId,
      isRecommendation,
      isBookmarked, // ✅ اضافه کردن وضعیت بوکمارک
    }),
    [
      bookmarks,
      disliked,
      liked,
      movieDetail,
      episodeId,
      isRecommendation,
      isBookmarked,
      handleAddToBookmark,
      handleDislike,
      handleLike,
    ],
  );

  return (
    <div>
      <div className="container mt-[30px] md:mt-5">
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
          <PreviewBox {...previewBoxProps} />
        </div>
      )}
    </div>
  );
}

export default MovieSlider;
