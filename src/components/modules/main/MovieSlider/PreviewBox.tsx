"use client";
import { useAuth } from "@/src/context/AuthContextProvider";
import ActiveLike from "@/src/icons/ActiveLike";
import Dislike from "@/src/icons/Dislike";
import IMBD from "@/src/icons/IMBD";
import Like from "@/src/icons/Like";
import Plus from "@/src/icons/Plus";
import { addOrDeleteBookmark } from "@/src/libs/actions/bookmark";
import { dislikeMovie, likeMovie } from "@/src/libs/actions/movie";
import { getAgeRange, userSubscriptionHref } from "@/src/utils/funcs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPlay } from "react-icons/fa6";
import { GrCircleInformation } from "react-icons/gr";
import { IoCheckmarkSharp } from "react-icons/io5";
import PreviewSkeleton from "./PreviewSkeleton";

function PreviewBox({
  movieDetail: initialMovieDetail,
  user,
  userBookmarks,
  isRecommendation,
  movieId,
  loading,
}) {
  const { subscripton, isLogin } = useAuth();
  console.log(subscripton);

  const router = useRouter();
  const [movieDetail, setMovieDetail] = useState(initialMovieDetail);
  const [bookmarks, setBookmarks] = useState(userBookmarks || []);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [episodeId, setEpisodeId] = useState("");
  const previewBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialMovieDetail) return;

    setMovieDetail(initialMovieDetail);

    if (!user?._id) {
      setLiked(false);
      setDisliked(false);
      return;
    }

    setLiked(initialMovieDetail?.liked?.includes(user._id) ?? false);
    setDisliked(initialMovieDetail?.disliked?.includes(user._id) ?? false);
  }, [initialMovieDetail, user?._id]);

  useEffect(() => {
    const getSeriesEpisode = async () => {
      if (movieDetail?.type !== "series" || !movieDetail?._id) return;
      try {
        const res = await fetch(`/api/episode/${movieDetail._id}`);
        const episode = await res.json();
        setEpisodeId(episode._id);
      } catch (error) {
        console.error("Error fetching episode:", error);
      }
    };
    getSeriesEpisode();
  }, [movieDetail?._id, movieDetail?.type]);

  useLayoutEffect(() => {
    if (previewBoxRef.current) {
      previewBoxRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [movieId, movieDetail?._id]);

  const handleAddToBookmark = async () => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await addOrDeleteBookmark(movieDetail._id);
      if (res.status === 201) {
        setBookmarks([...bookmarks, movieDetail._id]);
        // به‌روزرسانی movieDetail
        setMovieDetail((prev) => ({
          ...prev,
          isBookmarked: true,
        }));
        toast.success(res.message || "با موفقیت اضافه شد");
      } else if (res.status === 200) {
        setBookmarks(bookmarks.filter((id: string) => id !== movieDetail._id));
        // به‌روزرسانی movieDetail
        setMovieDetail((prev) => ({
          ...prev,
          isBookmarked: false,
        }));
        toast.success(res.message || "با موفقیت حذف شد");
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromBookmark = async () => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await addOrDeleteBookmark(movieDetail._id);
      if (res.status === 200) {
        setBookmarks(bookmarks.filter((id: string) => id !== movieDetail._id));
        // به‌روزرسانی movieDetail
        setMovieDetail((prev) => ({
          ...prev,
          isBookmarked: false,
        }));
        toast.success(res.message || "با موفقیت حذف شد");
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    const prevLiked = liked;
    const prevDisliked = disliked;

    setLiked(!prevLiked);
    setDisliked(false);

    try {
      const res = await likeMovie(movieDetail._id, user._id, movieDetail?.link);

      if (res.status === 200) {
        toast.success(res.message);
      } else {
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
  };

  const handleDislike = async () => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
    if (isLoading) return;
    setIsLoading(true);

    const prevDisliked = disliked;
    const prevLiked = liked;

    setDisliked(!prevDisliked);
    setLiked(false);

    try {
      const res = await dislikeMovie(
        movieDetail._id,
        user._id,
        movieDetail?.link,
      );

      if (res.status === 200) {
        toast.success(res.message);
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
  };

  // اولویت 1: از movieDetail.isBookmarked استفاده کن
  // اولویت 2: از bookmarks Array استفاده کن
  const isBookmarked = useMemo(() => {
    // اگر movieDetail.isBookmarked وجود داره، ازش استفاده کن
    if (movieDetail?.isBookmarked !== undefined) {
      return movieDetail.isBookmarked;
    }
    // در غیر اینصورت از bookmarks array استفاده کن
    return bookmarks.includes(movieDetail?._id);
  }, [bookmarks, movieDetail?._id, movieDetail?.isBookmarked]);

  if (!movieDetail || loading) {
    return <PreviewSkeleton ref={previewBoxRef} />;
  }

  return (
    <div ref={previewBoxRef} className="my-10 hidden md:block">
      <div className="flex items-end justify-between flex-row-reverse relative movie-perview">
        <Image
          className="md:h-[539px] aspect-video w-[75%] object-cover static"
          src={movieDetail.deskBanner}
          width={1519}
          height={534}
          sizes="75vw"
          alt={movieDetail.title}
        />
        <div className="w-[25%] z-20 right-10 md:h-[539px] rigth-side">
          <div className="relative top-[23%] right-10">
            <span className="block text-white text-center md:text-right text-base md:text-[22px]">
              {movieDetail.title}
            </span>
            <div className="hidden md:flex items-center gap-x-5 font-Dana text-white text-sm mt-5">
              <span
                className={`${getAgeRange(movieDetail.ageRange)} text-black flex-center text-sm rounded-full px-1.5`}
              >
                {movieDetail.ageRange}+
              </span>
              <span>سال {movieDetail.showTime}</span>
              {movieDetail?.type === "film" && (
                <span>{movieDetail.time} دقیقه</span>
              )}
              <div className="flex items-center gap-x-1">
                <IMBD />
                <span className="mt-0.5">{movieDetail.IMDB}</span>
              </div>
            </div>
            <p className="hidden md:block static w-[614px] text-white text-xs leading-6 mt-5">
              {movieDetail.shortDesc}
            </p>
            <p className="my-3 text-white text-xs/6 text-center md:text-right">
              تماشای اختصاصی در میلا فیلم با بروزترین فیلم و سریال های جهان
            </p>
            <div className="flex items-center justify-center w-[500px] md:justify-start gap-x-4 mt-4">
              <Link
                href={userSubscriptionHref(
                  subscripton,
                  movieDetail,
                  movieDetail.contentType === "isKid",
                  episodeId,
                )}
                className="bg-white text-milafilmBlack hover:bg-milafilm hover:text-white flex items-center gap-x-2 justify-between text-xs py-3 px-5 rounded-xl"
              >
                <FaPlay />
                {subscripton?.hasSubscription
                  ? `تماشا ${movieDetail.type === "film" ? "فیلم" : "سریال"}`
                  : " خرید اشتراک"}
              </Link>

              {!isRecommendation && isLogin && (
                <>
                  {!isBookmarked ? (
                    <button
                      onClick={handleAddToBookmark}
                      disabled={isLoading}
                      className="flex-center py-3 px-3 bg-gray-500/35 rounded-full text-[13px] hover:bg-gray-500/50 transition-colors"
                    >
                      <Plus />
                    </button>
                  ) : (
                    <button
                      onClick={handleRemoveFromBookmark}
                      disabled={isLoading}
                      className="flex-center py-3 px-3 w-[49px] h-[49px] bg-gray-500/35 rounded-full text-[13px] hover:bg-gray-500/50 transition-colors"
                    >
                      <IoCheckmarkSharp className="text-xl text-white" />
                    </button>
                  )}
                </>
              )}

              {!isRecommendation && isLogin && (
                <>
                  {liked ? (
                    <button
                      onClick={handleLike}
                      disabled={isLoading}
                      className="flex-center w-[49px] h-[49px] bg-gray-500/35 rounded-full text-[13px] hover:bg-gray-500/50 transition-colors"
                    >
                      <ActiveLike className="fill-white stroke-white !w-[25px] !h-[25px]" />
                    </button>
                  ) : (
                    <button
                      onClick={handleLike}
                      disabled={isLoading}
                      className="flex-center w-[49px] h-[49px] bg-gray-500/35 rounded-full text-[13px] hover:bg-gray-500/50 transition-colors"
                    >
                      <Like className="fill-white stroke-white" />
                    </button>
                  )}

                  {disliked ? (
                    <button
                      onClick={handleDislike}
                      disabled={isLoading}
                      className="flex-center w-[49px] h-[49px] bg-gray-500/35 rounded-full text-[13px] hover:bg-gray-500/50 transition-colors"
                    >
                      <ActiveLike
                        isDislike
                        className="fill-white stroke-white !w-[25px] !h-[25px]"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={handleDislike}
                      disabled={isLoading}
                      className="flex-center w-[49px] h-[49px] bg-gray-500/35 rounded-full text-[13px] hover:bg-gray-500/50 transition-colors"
                    >
                      <Dislike className="fill-white stroke-white" />
                    </button>
                  )}
                </>
              )}

              <Link
                href={
                  movieDetail.type === "film"
                    ? `/movie/${movieDetail.link}`
                    : `/series/${movieDetail.link}`
                }
                className="hidden md:flex items-center text-sm gap-x-2 text-white hover:text-milafilm transition-colors"
              >
                <GrCircleInformation className="text-3xl" />
                اطلاعات بیشتر
              </Link>
            </div>
            <div className="text-xs hidden md:flex text-[#ccc] mt-5 items-center gap-x-1">
              ستارگان :{" "}
              <div className="flex items-center flex-wrap">
                {movieDetail.actors?.slice(0, 4).map((actor: any) => (
                  <Link
                    key={actor._id}
                    href={`/biography/${actor.link}`}
                    className="ml-2 block hover:text-white transition-colors"
                  >
                    {actor.name}
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-xs hidden md:block text-[#ccc] mt-5">
              کارگردان : {movieDetail.director}
            </p>
            <p className="text-xs hidden md:block text-[#ccc] mt-5">
              دسته بندی :{" "}
              {movieDetail.categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/category/${movieDetail.categories[0]._id}`}
                >
                  {category.title}{" "}
                </Link>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewBox;
