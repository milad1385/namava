import Title from "@/src/components/modules/p-admin/Title";
import AddNewCollection from "@/src/components/templates/p-admin/collection/AddNewCollection";
import EditCollection from "@/src/components/templates/p-admin/collection/EditCollection";
import {
  getAllMoviesWithOutPagination,
  getCollection,
} from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "آپدیت مجموعه ها",
  description: "از این صفحه میتوان برای آپدیت مجموعه  ها استفاده کرد",
};

async function page({ params }: TParams) {
  const collection = await getCollection(params?.link as string);
  const movies = await getAllMoviesWithOutPagination();
  return (
    <div>
      <Title name={`ویرایش مجموعه ${collection.title}`} />
      <EditCollection
        movies={JSON.parse(JSON.stringify(movies))}
        collection={JSON.parse(JSON.stringify(collection))}
      />
    </div>
  );
}

export default page;
