import Title from "@/src/components/modules/p-admin/Title";
import EditArticle from "@/src/components/templates/p-admin/article/EditArticle";
import { getAllMoviesWithOutPagination } from "@/src/libs/service/services";
import React from "react";

async function page() {
  const movies = await getAllMoviesWithOutPagination();
  return (
    <div>
      <Title name={`ویرایش مقاله تست`} />
      <EditArticle movies={JSON.parse(JSON.stringify(movies))} />
    </div>
  );
}

export default page;
