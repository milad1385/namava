import Search from "@/src/components/modules/p-admin/Search";
import Title from "@/src/components/modules/p-admin/Title";
import AddCategories from "@/src/components/templates/p-admin/categories/AddCategory";
import CategoriesList from "@/src/components/templates/p-admin/categories/CategoriesList";
import { getAllCategories } from "@/src/libs/service/services";
import { TAdminPage } from "@/src/libs/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "دسته بندی ها",
  description: "از این صفحه میتوان برای مدیریت دسته بندی ها استفاده کرد",
};

async function CategoriesPage({ searchParams }: TAdminPage) {
  const { categories, counts }: any = await getAllCategories(
    +searchParams.page,
    searchParams.q
  );
  return (
    <>
      <Title name="ایجاد دسته بندی" />
      <AddCategories />
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-3">
        <Title name="لیست دسته بندی ها" />
        <Search />
      </div>
      <CategoriesList
        categories={JSON.parse(JSON.stringify(categories))}
        counts={counts}
      />
    </>
  );
}

export default CategoriesPage;
