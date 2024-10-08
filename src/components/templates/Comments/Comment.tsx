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
import React, { useState } from "react";
import toast from "react-hot-toast";

function Comment({ onShow, comment, user, movieLink }: TComment) {
  const [isSpoiled, setIsSpoiled] = useState(comment.isSpoiled);
  const [liked, setLiked] = useState(comment.liked.includes(user));
  const [disliked, setDisliked] = useState(comment.disliked.includes(user));
  const [likeList, setLikeList] = useState<string[]>(comment.liked);
  const [disLikeList, setDisLikeList] = useState<string[]>(comment.disliked);
  const path = usePathname();
  const isKid = path.includes("/kids");

  const handleLike = async (commentId: string) => {
    if (!user) {
      return onShow(true);
    }

    setLikeList((prev: any) => [...prev, user]);
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
      setDisLikeList((prev) => prev.filter((dislike) => dislike !== user));
    }
    const res = await likeComment(commentId, user);
    if (res.status === 200) {
      toast.success(`${res.message}`);
    }
  };

  const handleDislike = async (commentId: string) => {
    if (!user) {
      return onShow(true);
    }

    setDisLikeList((prev: any) => [...prev, user]);
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
      setLikeList((prev) => prev.filter((dislike) => dislike !== user))
    }

    const res = await dislikeComment(commentId, user);
    if (res.status === 200) {
      toast.success(`${res.message}`);
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
          {comment.user.name} - {" "}
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
                {liked ? (
                  <ActiveLike onClick={() => handleLike(comment._id)} />
                ) : (
                  <Like
                    onClick={() => handleLike(comment._id)}
                    fill={isKid ? "gray" : "white"}
                    className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] cursor-pointer"
                  />
                )}
                <span className="font-Dana text-sm">
                  {likeList.length}
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                {disliked ? (
                  <ActiveLike
                    isDislike
                    onClick={() => handleDislike(comment._id)}
                  />
                ) : (
                  <Dislike
                    onClick={() => handleDislike(comment._id)}
                    fill={isKid ? "gray" : "white"}
                    className="w-[30px] md:w-[40px] h-[30px] md:h-[40px] cursor-pointer"
                  />
                )}
                <span className="font-Dana text-sm">
                  {disLikeList.length}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
