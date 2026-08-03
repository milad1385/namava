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
  return (
    <div className="py-28 container text-white">
      <Bookmark />
    </div>
  );
}

export default Bookmarks;
