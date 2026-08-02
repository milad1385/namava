import Title from "@/src/components/modules/p-admin/Title";
import EditArticle from "@/src/components/templates/p-admin/article/EditArticle";
import {
  getAllMoviesWithOutPagination,
  getArticle,
} from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import React from "react";

async function page({ params }: TParams) {
  const [movies, article] = await Promise.all([
    getAllMoviesWithOutPagination(),
    getArticle(params.link as string),
  ]);
  return (
    <div>
      <Title name={`ویرایش مقاله ${article.title}`} />
      <EditArticle
        movies={JSON.parse(JSON.stringify(movies))}
        article={JSON.parse(JSON.stringify(article))}
      />
    </div>
  );
}

export default page;
