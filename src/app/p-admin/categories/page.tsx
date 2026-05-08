import Search from "@/src/components/modules/p-admin/Search";
import Title from "@/src/components/modules/p-admin/Title";
import AddCategories from "@/src/components/templates/p-admin/categories/AddCategory";
import CategoriesList from "@/src/components/templates/p-admin/categories/CategoriesList";
import { getAllCategories } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "دسته بندی ها",
  description: "از این صفحه میتوان برای مدیریت دسته بندی ها استفاده کرد",
};

async function CategoriesPage({ searchParams }: TParams) {
  const { page, q } = await searchParams;
  const { categories, counts }: any = await getAllCategories(
    +page,
    q as string,
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
