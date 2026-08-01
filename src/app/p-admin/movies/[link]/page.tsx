import Title from "@/src/components/modules/p-admin/Title";
import EditMovie from "@/src/components/templates/p-admin/film/EditMovie";
import {
  getAllSubcategories,
  getMovie,
  getStars,
} from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ویرایش فیلم و سریال ها",
  description: "از این صفحه میتوان برای ویرایش فیلم و سریال ها استفاده کرد",
};

async function page({ params }: TParams) {
  const [allStarts, allSubCategories , movie]: any = await Promise.all([
    getStars(),
    getAllSubcategories(),
    getMovie(params?.link as string),
  ]);
  return (
    <div>
      <Title name="ویرایش" />
      <EditMovie
        subCategories={JSON.parse(JSON.stringify(allSubCategories))}
        stars={JSON.parse(JSON.stringify(allStarts))}
        movie={JSON.parse(JSON.stringify(movie))}
      />
    </div>
  );
}

export default page;
