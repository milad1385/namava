import Search from "@/src/components/modules/p-admin/Search";
import Title from "@/src/components/modules/p-admin/Title";
import AddNewArticle from "@/src/components/templates/p-admin/article/AddNewArticle";
import ArticleList from "@/src/components/templates/p-admin/article/ArticleList";
import {
  getAllArticles,
  getAllMoviesWithOutPagination,
} from "@/src/libs/service/services";
import { TAdminPage } from "@/src/libs/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "مقاله ها",
  description: "از این صفحه میتوان برای مدیریت مقاله  ها استفاده کرد",
};

async function ArticlesPage({ searchParams }: TAdminPage) {
  const [movies, data]: any = await Promise.all([
    getAllMoviesWithOutPagination(),
    getAllArticles(+searchParams.page, searchParams.q),
  ]);
  return (
    <>
      <Title name="ایجاد مقاله جدید" />
      <AddNewArticle movies={JSON.parse(JSON.stringify(movies))} />
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-3">
        <Title name="لیست مقاله ها" />
        <Search />
      </div>
      <ArticleList
        articles={JSON.parse(JSON.stringify(data.articles))}
        counts={data.counts}
      />
    </>
  );
}

export default ArticlesPage;
