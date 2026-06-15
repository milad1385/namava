import React from "react";
import Bookmark from "@/src/components/templates/bookmarks/Bookmarks";
import { getUserBookmarks } from "@/src/libs/service/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مورد علاقه ها | نشان شده ها",
  description:
    "در این صفحه میتوانید فیلم هایی که آنها رو نشان کردید رو مشاهده کنید",
  keywords: "نشان شده ، مورد علاقه",
};

async function Bookmarks() {
  const bookmarks: any = await getUserBookmarks();

  const bookmarksArray = Array.isArray(bookmarks) ? bookmarks : [];

  const kidBookmarks = bookmarksArray?.filter(
    (bookmark: any) => bookmark?.movie?.contentType === "kid",
  );

  return (
    <div className="py-24 container text-white">
      <Bookmark bookmarks={JSON.parse(JSON.stringify(kidBookmarks))} />
    </div>
  );
}

export default Bookmarks;
