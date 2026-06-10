import { useAuth } from "@/src/context/AuthContextProvider";
import ActiveLike from "@/src/icons/ActiveLike";
import Dislike from "@/src/icons/Dislike";
import IMBD from "@/src/icons/IMBD";
import Like from "@/src/icons/Like";
import Plus from "@/src/icons/Plus";
import { userSubscriptionHref } from "@/src/utils/funcs";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";
import { GrCircleInformation } from "react-icons/gr";
import { IoCheckmarkSharp } from "react-icons/io5";

function PreviewBox({
  movieDetail,
  bookmarks,
  handleAddToBookmark,
  handleRemoveFromBookmark,
  handleLike,
  liked,
  disliked,
  handleDislike,
  episodeId,
}) {
  const { subscripton, isLogin } = useAuth();
  return (
    <div className="my-10 hidden md:block">
      <div className="flex items-end justify-between flex-row-reverse relative movie-perview">
        <Image
          className="md:h-[539px] aspect-video  w-[75%]  object-cover static"
          src={movieDetail.deskBanner}
          width={1519}
          height={534}
          sizes="75vw"
          alt={movieDetail.title}
        />
        <div className="w-[25%]  z-20 right-10 md:h-[539px] rigth-side">
          <div className="relative top-[23%] right-10">
            <span className="block text-white text-center md:text-right text-base md:text-[22px]">
              {movieDetail.title}
            </span>
            <div className="hidden md:flex items-center gap-x-5 font-Dana text-white text-sm mt-5">
              <span className="bg-orange-400 text-sm rounded-full px-1.5">
                {movieDetail.ageRange}+
              </span>
              <span>{movieDetail.showTime}</span>
              <span>{movieDetail.time} دقیقه</span>
              <div className="flex items-center gap-x-1">
                <IMBD />
                <span className="mt-0.5">{movieDetail.IMDB}</span>
              </div>
            </div>
            <p className="hidden md:block static w-[614px]  text-white text-xs leading-6 mt-5">
              {movieDetail.shortDesc}
            </p>
            <p className="my-3 text-white text-xs/6  text-center md:text-right">
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
                className="bg-white text-namavaBlack hover:bg-namava hover:text-white flex items-center gap-x-2 justify-between text-xs py-3 px-5 rounded-xl"
              >
                <FaPlay />
                {subscripton?.hasSubscription
                  ? `تماشا ${movieDetail.type === "film" ? "فیلم" : "سریال"}`
                  : " خرید اشتراک"}
              </Link>
              {isLogin ? (
                !bookmarks.includes(movieDetail._id) ? (
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
                    <IoCheckmarkSharp className="text-xl" />
                  </button>
                )
              ) : (
                ""
              )}
              {isLogin ? (
                <>
                  {liked ? (
                    <button
                      onClick={() => handleLike(movieDetail._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <ActiveLike className="fill-white stroke-white !w-[25px] !h-[25px]" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLike(movieDetail._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <Like className="fill-white stroke-white" />
                    </button>
                  )}
                  {disliked ? (
                    <button
                      onClick={() => handleDislike(movieDetail._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <ActiveLike
                        isDislike
                        className="fill-white stroke-white !w-[25px] !h-[25px]"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDislike(movieDetail._id)}
                      className="flex-center w-[49px] h-[49px]  bg-gray-500/35  rounded-full text-[13px]"
                    >
                      <Dislike className=" fill-white stroke-white" />
                    </button>
                  )}
                </>
              ) : (
                ""
              )}
              <Link
                href={
                  movieDetail.type === "film"
                    ? `/movie/${movieDetail.link}`
                    : `/series/${movieDetail.link}`
                }
                className="hidden md:flex items-center  text-sm gap-x-2 text-white hover:text-namava"
              >
                <GrCircleInformation className="text-3xl" />
                اطلاعات بیشتر
              </Link>
            </div>
            <div className="text-xs hidden md:flex text-[#ccc] mt-5 items-center gap-x-1">
              ستارگان :{" "}
              <div className="flex items-center">
                {movieDetail.actors.slice(0, 4).map((actor: any) => (
                  <Link
                    key={actor._id}
                    href={`/biography/${actor.link}`}
                    className="ml-2 block"
                  >
                    {actor.name}
                  </Link>
                ))}
              </div>
            </div>
            <p className="text-xs hidden md:block text-[#ccc] mt-5">
              کارگردان : {movieDetail.director}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewBox;
