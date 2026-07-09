"use client";
import Button from "@/src/components/modules/auth/Button/Button";
import Message from "@/src/icons/Message";
import Send from "@/src/icons/Send";
import Image from "next/image";
import React, { useState } from "react";
import Comment from "./Comment";
import LoginModal from "@/src/components/modules/modals/LoginModal";
import { useRouter } from "next/navigation";
import { sendNewComment } from "@/src/libs/actions/comment";
import toast from "react-hot-toast";

type TComments = {
  isKid?: boolean;
  user: string;
  movieId: string;
  comments: any;
  movieLink?: string;
};
function Comments({ isKid, user, movieId, comments, movieLink }: TComments) {
  const router = useRouter();
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  return (
    <>
      <div
        className={`w-full px-6 py-10 xl:max-w-[1000px] ${
          isKid ? "bg-[#f2f2f2] text-black" : "bg-milafilmBlack text-white"
        } rounded-lg mx-auto mt-20`}
      >
        <h3
          className={`text-center text-xl ${
            isKid ? "text-black" : "text-white "
          } font-IranMedium`}
        >
          نظرات کاربران
        </h3>
        {!user ? (
          <div
            className={`flex flex-col md:flex-row items-center gap-y-4 gap-x-9 rounded-lg mx-auto mt-10 w-full  md:w-[484px] ${
              isKid ? "bg-white text-black" : "bg-[#37383e] text-white"
            } p-4`}
          >
            <div className="flex items-center">
              <Message />
              <p className="text-xs">برای ثبت نظر ابتدا وارد شوید.</p>
            </div>
            <div className="flex items-center gap-x-4">
              <Button
                className={`!m-0 bg-white !w-[108px] text-xs ${
                  isKid
                    ? "!bg-milafilm hover:!bg-sky-600 text-white"
                    : "text-zinc-700"
                }`}
                onClick={() => router.push("/register")}
              >
                ثبت نام
              </Button>
              <Button
                className={`!m-0 !w-[108px] text-xs ${
                  isKid
                    ? "bg-zinc-600 hover:bg-zinc-400"
                    : "!bg-gray-500/50 hover:bg-white/40"
                } text-white`}
                onClick={() => router.push("/login")}
              >
                ورود
              </Button>
            </div>
          </div>
        ) : (
          <form
            action={async (formData: FormData) => {
              const res = await sendNewComment(formData, movieId);
              if (res?.status === 201) {
                router.refresh();
                toast.success(`${res?.message}`);
              } else {
                toast.error(`${res?.message}`);
              }
            }}
          >
            <div className="w-full flex items-center gap-x-3 mt-10">
              <Image
                src="/images/user.png"
                width={400}
                height={400}
                className="w-[30px] flex-shrink-0 md:w-[40px] h-[30px] md:h-[40px] rounded-full"
                alt="user.png"
              />
              <input
                placeholder="نظرتان درباره این فیلم چیست ؟"
                name="content"
                className="w-full h-[40px] md:h-[52px] text-black  outline-none placeholder:text-milafilmBlack text-xs md:text-sm px-3 md:px-6 py-3 rounded-xl"
              />
              <button type="submit">
                <Send />
              </button>
            </div>
            <div className="pt-5 md:pr-14">
              <div className="flex items-center gap-x-2">
                <input
                  id="spoil"
                  name="isSpoiled"
                  type="checkbox"
                  className={`film-checkbox border-2 ${isKid ? "!border-black" : "!border-white"}`}
                />
                <label className="text-xs" htmlFor="spoil">
                  این نظر حاوی اسپویلر است و داستان فیلم را لو می‌دهد.
                </label>
              </div>
            </div>
          </form>
        )}

        <div className="divide-y divide-gray-700">
          {comments.length ? (
            comments.map((comment: any) => (
              <Comment
                key={comment._id}
                onShow={setIsShowLoginModal}
                comment={comment}
                user={user}
                movieLink={movieLink || ""}
              />
            ))
          ) : (
            <div
              className={`flex flex-col md:flex-row items-center justify-center gap-y-4 gap-x-9 rounded-lg mx-auto mt-10 w-full  md:w-[484px] ${
                isKid ? "bg-white text-black" : "bg-[#37383e] text-white"
              } p-4`}
            >
              <div className="flex items-center gap-x-2">
                <Message />
                <p className="text-sm md:text-base">
                  هیچ کامنتی تاکنون ثبت نشده است.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {isShowLoginModal && (
        <LoginModal isShow={isShowLoginModal} onClose={setIsShowLoginModal} />
      )}
    </>
  );
}

export default Comments;
