"use client";

import ActiveLike from "@/src/icons/ActiveLike";
import Chevron from "@/src/icons/Chevron";
import Dislike from "@/src/icons/Dislike";
import Information from "@/src/icons/Information";
import Like from "@/src/icons/Like";
import { dislikeComment, likeComment } from "@/src/libs/actions/comment";
import { TComment } from "@/src/libs/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function Comment({ onShow, comment, user, movieLink }: TComment) {
  const [isSpoiled, setIsSpoiled] = useState(comment.isSpoiled);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeList, setLikeList] = useState<string[]>([]);
  const [disLikeList, setDisLikeList] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const path = usePathname();
  const isKid = path.includes("/kids");

  useEffect(() => {
    if (user) {
      setLiked(comment.liked?.includes(user) || false);
      setDisliked(comment.disliked?.includes(user) || false);
    }
    setLikeList(comment.liked || []);
    setDisLikeList(comment.disliked || []);
  }, [comment, user]);

  const handleLike = async (commentId: string) => {
    if (!user) {
      return onShow(true);
    }

    if (isProcessing) return;
    setIsProcessing(true);

    const prevLiked = liked;
    const prevDisliked = disliked;
    const prevLikeList = [...likeList];
    const prevDisLikeList = [...disLikeList];

    if (liked) {
      setLikeList((prev) => prev.filter((id) => id !== user));
      setLiked(false);
    } else {
      setLikeList((prev) => [...prev, user]);
      setLiked(true);

      if (disliked) {
        setDisliked(false);
        setDisLikeList((prev) => prev.filter((id) => id !== user));
      }
    }

    try {
      const res = await likeComment(commentId, user);
      if (res.status === 200) {
        toast.success(res.message);
      } else {
        setLiked(prevLiked);
        setDisliked(prevDisliked);
        setLikeList(prevLikeList);
        setDisLikeList(prevDisLikeList);
        toast.error(res.message || "خطا در ثبت لایک");
      }
    } catch (error) {
      setLiked(prevLiked);
      setDisliked(prevDisliked);
      setLikeList(prevLikeList);
      setDisLikeList(prevDisLikeList);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDislike = async (commentId: string) => {
    if (!user) {
      return onShow(true);
    }

    if (isProcessing) return;
    setIsProcessing(true);

    const prevLiked = liked;
    const prevDisliked = disliked;
    const prevLikeList = [...likeList];
    const prevDisLikeList = [...disLikeList];

    if (disliked) {
      setDisLikeList((prev) => prev.filter((id) => id !== user));
      setDisliked(false);
    } else {
      setDisLikeList((prev) => [...prev, user]);
      setDisliked(true);

      if (liked) {
        setLiked(false);
        setLikeList((prev) => prev.filter((id) => id !== user));
      }
    }

    try {
      const res = await dislikeComment(commentId, user);
      if (res.status === 200) {
        toast.success(res.message);
      } else {
        setLiked(prevLiked);
        setDisliked(prevDisliked);
        setLikeList(prevLikeList);
        setDisLikeList(prevDisLikeList);
        toast.error(res.message || "خطا در ثبت دیس‌لایک");
      }
    } catch (error) {
      setLiked(prevLiked);
      setDisliked(prevDisliked);
      setLikeList(prevLikeList);
      setDisLikeList(prevDisLikeList);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`text-xs ${
        isKid ? "text-[#666]" : "text-customGray"
      } pt-10 pb-5`}
    >
      <div className="flex items-center gap-x-4">
        <Image
          src="/images/user.png"
          alt="prof.jpg"
          width={400}
          height={400}
          className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] rounded-full"
        />
        <p>
          {comment.user.name} -{" "}
          {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
        </p>
      </div>
      <div className="pr-14 pt-1.5">
        {isSpoiled ? (
          <div
            onClick={() => setIsSpoiled(false)}
            className={`!max-w-[500px] py-3 px-4 rounded-xl ${
              isKid ? "bg-[#666666]" : "bg-[#37383e] "
            } flex items-center justify-between mt-5 md:cursor-pointer`}
          >
            <div className="flex items-center gap-x-3">
              <Information />
              <p className="text-white text-xs">
                این نظر حاوی اسپویلر است و داستان فیلم را لو می‌دهد.
              </p>
            </div>
            <Chevron />
          </div>
        ) : (
          <>
            <p
              className={`${
                isKid ? "text-black" : "text-white"
              } text-justify text-xs/[20px]`}
            >
              {comment.content}
            </p>
            <div className="flex items-center gap-x-8 mt-6">
              <div className="flex items-center gap-x-2">
                <button
                  onClick={() => handleLike(comment._id)}
                  disabled={isProcessing}
                  className="focus:outline-none"
                >
                  {liked ? (
                    <ActiveLike isKid={isKid} />
                  ) : (
                    <Like
                      fill={isKid ? "gray" : "white"}
                      className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] cursor-pointer"
                    />
                  )}
                </button>
                <span className="font-Dana text-sm">{likeList.length}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <button
                  onClick={() => handleDislike(comment._id)}
                  disabled={isProcessing}
                  className="focus:outline-none"
                >
                  {disliked ? (
                    <ActiveLike isKid={isKid} isDislike />
                  ) : (
                    <Dislike
                      fill={isKid ? "gray" : "white"}
                      className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] cursor-pointer"
                    />
                  )}
                </button>
                <span className="font-Dana text-sm">{disLikeList.length}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
