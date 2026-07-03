import { useAuth } from "@/src/context/AuthContextProvider";
import ActiveLike from "@/src/icons/ActiveLike";
import Dislike from "@/src/icons/Dislike";
import IMBD from "@/src/icons/IMBD";
import Like from "@/src/icons/Like";
import Plus from "@/src/icons/Plus";
import { addOrDeleteBookmark } from "@/src/libs/actions/bookmark";
import { dislikeMovie, likeMovie } from "@/src/libs/actions/movie";
import { THeaderDetails } from "@/src/libs/types";
import { userSubscriptionHref } from "@/src/utils/funcs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlay } from "react-icons/fa6";
import { GrCircleInformation } from "react-icons/gr";
import { IoCheckmarkSharp } from "react-icons/io5";

function HeaderDetail({
  isKid,
  info,
  subscription,
  user,
  bookmarks,
  episodeId,
}: THeaderDetails) {
  const pathname = usePathname();
  const { activeProfile } = useAuth();
  const [liked, setLiked] = useState(info.liked.includes(user?._id));
  const [userBookmarks, setUserBookmarks] = useState(bookmarks);
  const [disliked, setDisliked] = useState(info.disliked.includes(user?._id));
  const isSinglePage =
    pathname.includes("/movie") || pathname.includes("/series");
  const age = Number(info?.ageRange);
  const router = useRouter();

  const handleDislike = async (id: string) => {
    if (!user) {
      router.push("/login");
    }
    setDisliked(!disliked);
    if (liked) setLiked(false);
    const res = await dislikeMovie(id, user._id, info.link);
    if (res.status === 200) {
      toast.success(`${res.message}`);
    }
  };

  const handleLike = async (id: string) => {
    if (!user) {
      router.push("/login");
    }

    setLiked(!liked);
    if (disliked) setDisliked(false);
    const res = await likeMovie(id, user._id, info.link);

    if (res.status === 200) {
      toast.success(`${res.message}`);
    }
  };

  const handleAddToBookmark = async () => {
    setUserBookmarks([...bookmarks, info._id]);
    toast.success(`با موفقیت اضافه شد`);
    await addOrDeleteBookmark(info._id);
  };

  const handleRemoveFromBookmark = async () => {
    setUserBookmarks(bookmarks.filter((id: string) => id !== info._id));
    toast.success(`با موفقیت حذف شد`);
    await addOrDeleteBookmark(info._id);
  };

  return (
    <>
      {isKid ? (
        <div className="max-w-[90%] flex items-center justify-center flex-col mx-auto md:mx-0 md:max-w-[590px] space-y-4 !h-[456px] md:!h-[480px] p-4  rounded-md kid-title top-64 md:top-44 md:right-10 relative z-20">
          <Image
            src={info?.logo}
            width={1920}
            height={1080}
            alt="image-logo"
            className="max-w-[160px] md:max-w-[250px] object-contain mb-2.5 max-h-[160px] mx-auto md:mx-0 "
          />

          <h2 className="text-center font-IranMedium text-lg md:text-xl">
            {info.title}
          </h2>
          <p className="text-center line-clamp-2 md:line-clamp-6 text-xs md:text-[15px]/[26px]">
            {info.shortDesc}
          </p>

          {activeProfile?.limitsMovies?.includes(info._id) ? (
            <div className="bg-[#d95c5c] text-xs md:text-sm/[24px] py-4 px-4 rounded-md text-center">
              کاربر گرامی، محتوای مورد نظر به علت محدودیت اعمال شده از جانب صاحب
              حساب در دسترس نیست.
            </div>
          ) : (
            <div className="flex-center flex-col">
              <div className="flex items-center flex-col md:flex-row  gap-y-5 justify-center md:justify-start gap-x-4 mt-4">
                <Link
                  href={userSubscriptionHref(
                    subscription,
                    info,
                    isKid,
                    episodeId,
                  )}
                  className="bg-white hover:bg-milafilm hover:text-white flex items-center gap-x-2 justify-between text-xs py-3 px-5 rounded-xl"
                >
                  <FaPlay />
                  {subscription?.hasSubscription
                    ? `${info.type === "film" ? "تماشا فیلم" : "تماشا سریال"}`
                    : "خرید اشتراک"}
                </Link>
                <div className="flex items-center gap-x-4">
                  {!userBookmarks.includes(info._id) ? (
                    <button
                      onClick={handleAddToBookmark}
                      className="flex-center py-3 px-3  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <Plus />
                    </button>
                  ) : (
                    <button
                      onClick={handleRemoveFromBookmark}
                      className="flex-center py-3 px-3 w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <IoCheckmarkSharp className="text-xl text-white" />
                    </button>
                  )}
                  {liked ? (
                    <button
                      onClick={() => handleLike(info._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <ActiveLike className="fill-white stroke-white !w-[25px] !h-[25px]" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLike(info._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <Like className="fill-white stroke-white" />
                    </button>
                  )}
                  {disliked ? (
                    <button
                      onClick={() => handleDislike(info._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <ActiveLike
                        isDislike
                        className="fill-white stroke-white !w-[25px] !h-[25px]"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDislike(info._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <Dislike className=" fill-white stroke-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-x-2 mt-5">
            <span
              className={`${
                age === 3
                  ? "three"
                  : age === 7
                    ? "seven"
                    : age === 12
                      ? "twelve"
                      : age === 15
                        ? "fifteen"
                        : "eighteen"
              } flex-center text-sm rounded-full text-black font-bold px-1.5`}
            >
              {info.ageRange}+
            </span>
            <p className="text-xs">مناسب برای سنین بالای {age} سال</p>
          </div>
        </div>
      ) : (
        <div className="px-[43px] top-40 md:top-28  absolute z-20">
          <Link
            href={`/${info?.type === "film" ? "movie" : "series"}/${info?.link}`}
          >
            <Image
              src={info?.logo}
              width={1920}
              height={1080}
              alt="image-logo"
              className="max-w-[160px] md:max-w-[250px] object-contain mb-2.5 max-h-[160px] mx-auto md:mx-0 "
            />
          </Link>
          <div className="py-6">
            <Link
              href={`/${info?.type === "film" ? "movie" : "series"}/${info?.link}`}
            >
              <span className="block text-white text-center md:text-right text-base md:text-[22px]">
                {info.title}
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-x-5 font-Dana text-white text-sm mt-5">
              <span
                className={`${
                  age === 3
                    ? "three"
                    : age === 7
                      ? "seven"
                      : age === 12
                        ? "twelve"
                        : age === 15
                          ? "fifteen"
                          : "eighteen"
                } flex-center text-sm rounded-full text-black font-bold px-1.5`}
              >
                {info.ageRange}+
              </span>
              <span>سال {" "}{info.showTime}</span>
              {info.type === "film" && <span>{info.time} دقیقه</span>}
              <div className="flex items-center gap-x-1">
                <IMBD />
                <span className="mt-0.5">{info.IMDB}</span>
              </div>
            </div>
            <Link
              href={`/${info?.type === "film" ? "movie" : "series"}/${info?.link}`}
            >
              <p className="line-clamp-2 text-xs/[24px] md:text-sm/[28px] text-center md:text-right  md:line-clamp-6  max-w-[544px] text-white mt-5">
                {info.shortDesc}
              </p>
            </Link>

            <div className="flex items-center justify-center md:justify-start gap-x-4 mt-4 flex-col md:flex-row gap-y-3">
              <div className="flex items-center gap-x-3">
                <Link
                  href={userSubscriptionHref(
                    subscription,
                    info,
                    isKid,
                    episodeId,
                  )}
                  className="bg-white hover:bg-milafilm hover:text-white flex items-center gap-x-2 justify-between text-xs py-3 px-5 rounded-xl"
                >
                  <FaPlay />
                  {subscription?.hasSubscription
                    ? `${info.type === "film" ? "تماشا فیلم" : "تماشا سریال"}`
                    : "خرید اشتراک"}
                </Link>
                <Link
                  href={
                    pathname === "/"
                      ? `/${info.type === "film" ? "movie" : "series"}/${info.link}`
                      : "/"
                  }
                  className=" py-3 px-5 bg-gray-500/35 hover:bg-white/40 text-white rounded-xl text-[13px]"
                >
                  {pathname === "/" ? "پیش نمایش" : "بازگشت"}
                </Link>
              </div>

              {isSinglePage && user ? (
                <div className="flex items-center gap-x-3">
                  {!userBookmarks.includes(info._id) ? (
                    <button
                      onClick={handleAddToBookmark}
                      className="flex-center py-3 px-3  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <Plus />
                    </button>
                  ) : (
                    <button
                      onClick={handleRemoveFromBookmark}
                      className="flex-center py-3 px-3 w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <IoCheckmarkSharp className="text-xl text-white" />
                    </button>
                  )}
                  {liked ? (
                    <button
                      onClick={() => handleLike(info._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <ActiveLike className="fill-white stroke-white !w-[25px] !h-[25px]" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLike(info._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <Like className="fill-white stroke-white" />
                    </button>
                  )}
                  {disliked ? (
                    <button
                      onClick={() => handleDislike(info._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <ActiveLike
                        isDislike
                        className="fill-white stroke-white !w-[25px] !h-[25px]"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDislike(info._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <Dislike className=" fill-white stroke-white" />
                    </button>
                  )}
                </div>
              ) : (
                <Link
                  href={`/${info.type === "film" ? "movie" : "series"}/${info.link}`}
                  className="hidden md:flex items-center  text-sm gap-x-2 text-white hover:text-milafilm"
                >
                  <GrCircleInformation className="text-3xl" />
                  اطلاعات بیشتر
                </Link>
              )}
            </div>
            <p className="text-xs hidden md:flex text-gray-50 mt-5 items-center gap-x-3">
              ستارگان:
              {info.actors.slice(0, 4).map((actor: any) => (
                <Link
                  key={actor._id}
                  href={`/biography/${actor.link}`}
                  className="ml-1"
                >
                  {actor.name}
                </Link>
              ))}
            </p>
            <p className="text-xs hidden md:flex text-gray-50 mt-2 items-center gap-x-3">
              کارگردان: {info.director}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderDetail;
