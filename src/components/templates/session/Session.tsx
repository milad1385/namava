"use client";
import { useAuth } from "@/src/context/AuthContextProvider";
import ActiveLike from "@/src/icons/ActiveLike";
import Dislike from "@/src/icons/Dislike";
import Heart from "@/src/icons/Heart";
import Like from "@/src/icons/Like";
import { dislikeEpisode, likeEpisode } from "@/src/libs/actions/episode";
import { userSubscriptionHref } from "@/src/utils/funcs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaChevronDown, FaHeart, FaPlay } from "react-icons/fa6";

function Session({ episode, user, link, isKid, info }: any) {
  const subMenuRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(episode.liked.includes(user));
  const [disliked, setDisliked] = useState(episode.disliked.includes(user));
  const router = useRouter();

  const { subscripton } = useAuth();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDislike = async (id: string) => {
    if (!user) {
      router.push("/login");
    }

    const res = await dislikeEpisode(id, user, link);
    if (res.status === 200) {
      toast.success(`${res.message}`);
    }
    setDisliked(!disliked);

    if (liked) setLiked(false);
  };

  const handleLike = async (id: string) => {
    if (!user) {
      router.push("/login");
    }
    const res = await likeEpisode(id, user, link);
    if (res.status === 200) {
      toast.success(`${res.message}`);
    }
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  function calculateLikePercentage(episode: any) {
    const totalLikes = episode.liked.length;
    const totalDislikes = episode.disliked.length;
    const totalVotes = totalLikes + totalDislikes;

    // اگر هیچ لایکی وجود نداشته باشد، درصد را صفر در نظر بگیرید
    if (totalVotes === 0) {
      return 0;
    }

    // محاسبه درصد لایک‌ها
    const likePercentage = (totalLikes * 100) / totalVotes;

    return likePercentage;
  }

  useEffect(() => {
    if (isOpen) {
      const height = subMenuRef.current.scrollHeight;
      subMenuRef.current.style.height = height + "px";
    } else {
      subMenuRef.current.style.height = 0 + "px";
    }
  }, [isOpen]);
  return (
    <>
      <div className="md:cursor-pointer hidden md:block">
        <Link
          href={userSubscriptionHref(subscripton, info, isKid, episode._id)}
          className="relative group"
        >
          <Image
            src={episode.image}
            alt={episode.title}
            width={1920}
            height={1080}
            className="w-full rounded-md h-[223px]"
          />
          <div className="absolute z-20 bottom-4 px-4 right-0 left-0 flex items-center justify-between">
            <span
              className={`bg-zinc-900 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all text-white text-sm px-2 py-1 rounded-md font-Dana`}
            >
              {episode.time} دقیقه
            </span>
            <FaPlay className="text-[#aaa] text-xl show-hover" />
          </div>

          <div className="bg-black/50 rounded-md absolute inset-0 show-hover"></div>
        </Link>
        <div
          className={`mt-2 space-y-3 ${isKid ? "text-black" : "text-white"}`}
        >
          <h3 className="text-sm">{episode.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-1 flex-row-reverse">
              <span className="block mt-1 font-Dana">
                {calculateLikePercentage(episode).toFixed(0)}%
              </span>
              <Heart className="fill-red-600" />
            </div>
            <div className="flex items-center gap-x-2">
              {liked ? (
                <button
                  onClick={() => handleLike(episode._id)}
                  className={`flex-center py-3 px-3 w-[33px] h-[33px] ${
                    isKid ? "bg-[#f2f2f2]" : "bg-gray-500/35 "
                  } rounded-full text-[13px]`}
                >
                  <ActiveLike
                    isKid={isKid}
                    className={`!flex-shrink-0 w-[24px] h-[24px] ${
                      isKid
                        ? "!fill-black !stroke-black"
                        : "!fill-white !stroke-white "
                    }`}
                  />
                </button>
              ) : (
                <button
                  onClick={() => handleLike(episode._id)}
                  className={`flex-center py-3 px-3 w-[33px] h-[33px] rounded-full text-[13px] ${
                    isKid ? "bg-[#f2f2f2]" : "bg-gray-500/35 "
                  }`}
                >
                  <Like
                    className={`!flex-shrink-0 ${
                      isKid
                        ? "fill-black stroke-black"
                        : "fill-white stroke-white "
                    }`}
                  />
                </button>
              )}
              {disliked ? (
                <button
                  onClick={() => handleDislike(episode._id)}
                  className={`flex-center py-3 px-3 w-[33px] h-[33px]  ${
                    isKid ? "bg-[#f2f2f2]" : "bg-gray-500/35 "
                  }  rounded-full text-[13px]`}
                >
                  <ActiveLike
                    isDislike
                    isKid={isKid}
                    className={`!flex-shrink-0 w-[24px] h-[24px] ${
                      isKid
                        ? "!fill-black !stroke-black"
                        : "!fill-white !stroke-white "
                    }`}
                  />
                </button>
              ) : (
                <button
                  onClick={() => handleDislike(episode._id)}
                  className={`flex-center py-3 px-3 w-[33px] h-[33px]  ${
                    isKid ? "bg-[#f2f2f2]" : "bg-gray-500/35 "
                  } rounded-full text-[13px]`}
                >
                  <Dislike
                    className={`!flex-shrink-0 ${
                      isKid
                        ? "fill-black stroke-black"
                        : "fill-white stroke-white "
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
          {!isKid && (
            <p className="text-xs/[25px] text-[#aaaaaa] line-clamp-2">
              {episode.description}
            </p>
          )}
        </div>
      </div>
      <div className="block md:hidden bg-[#222327] rounded-md">
        <div
          className={`flex items-center h-[108px] ${
            isOpen ? "border-b-[0.3px] border-b-[#454444]" : "rounded-md"
          } overflow-hidden`}
        >
          <div className="w-full h-full bg-[#222327] py-4 pr-4 space-y-3">
            <h3 className="text-[13px] text-white font-Dana">
              {episode.title}
            </h3>
            <h5 className="font-Dana text-[#575757] text-[13px]">
              {episode.time} دقیقه
            </h5>
          </div>
          <div className="w-full h-full  py-4 pl-4 relative">
            <Image
              src={episode.image}
              alt={episode.title}
              fill
              className="object-cover"
            />
            <div className="toggle-menu" onClick={handleToggle}>
              <FaChevronDown
                className={`text-xs text-white transition-all ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <div className="absolute w-[68px] right-0 top-0 bottom-0 session-overlay"></div>
          </div>
        </div>
        <div ref={subMenuRef} className="submenu">
          <p className="text-xs/[25px] text-[#aaaaaa] px-4 py-4">
            {episode.description}
          </p>

          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex items-center gap-x-1 flex-row-reverse">
              <span className="block mt-1 text-white text-sm">85%</span>
              <Heart />
            </div>
            <div className="flex items-center gap-x-2">
              {liked ? (
                <button
                  onClick={() => handleLike(episode._id)}
                  className="flex-center py-3 px-3 w-[33px] h-[33px]  bg-gray-500/35  rounded-full text-[13px]"
                >
                  <ActiveLike className="!flex-shrink-0 w-[24px] h-[24px] fill-white stroke-white" />
                </button>
              ) : (
                <button
                  onClick={() => handleLike(episode._id)}
                  className="flex-center py-3 px-3 w-[33px] h-[33px]  bg-gray-500/35  rounded-full text-[13px]"
                >
                  <Like className="!flex-shrink-0 w-[22px] h-[22px] fill-white stroke-white" />
                </button>
              )}
              {disliked ? (
                <button
                  onClick={() => handleDislike(episode._id)}
                  className="flex-center py-3 px-3 w-[33px] h-[33px]  bg-gray-500/35  rounded-full text-[13px]"
                >
                  <ActiveLike
                    isDislike
                    className="!flex-shrink-0 !w-[22px] !h-[22px] fill-white stroke-white"
                  />
                </button>
              ) : (
                <button
                  onClick={() => handleDislike(episode._id)}
                  className="flex-center py-3 px-3 w-[33px] h-[33px]  bg-gray-500/35  rounded-full text-[13px]"
                >
                  <Dislike className="!flex-shrink-0 w-[22px] h-[22px] fill-white stroke-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Session;
