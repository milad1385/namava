import React from "react";
import Bookmark from "@/src/components/templates/bookmarks/Bookmarks";
import {
  getAllUserLikesMovie,
  getUserBookmarks,
} from "@/src/libs/service/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مورد علاقه ها | نشان شده ها",
  description:
    "در این صفحه میتوانید فیلم هایی که آنها رو نشان کردید رو مشاهده کنید",
  keywords: "نشان شده ، مورد علاقه",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function Bookmarks() {
  const [bookmarks, likesMovies] = await Promise.all([
    getUserBookmarks(),
    getAllUserLikesMovie(),
  ]);

  return (
    <div className="py-24 container text-white">
      <Bookmark
        bookmarks={JSON.parse(JSON.stringify(bookmarks))}
        likesMovies={JSON.parse(JSON.stringify(likesMovies))}
      />
    </div>
  );
}

export default Bookmarks;
