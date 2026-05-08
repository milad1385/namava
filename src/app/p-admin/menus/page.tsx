import Search from "@/src/components/modules/p-admin/Search";
import Title from "@/src/components/modules/p-admin/Title";
import AddNewMenu from "@/src/components/templates/p-admin/menus/AddNewMenu";
import MenusList from "@/src/components/templates/p-admin/menus/MenusList";
import { getAllMenus } from "@/src/libs/service/services";
import { TAdminPage, TParams } from "@/src/libs/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "منو ها",
  description: "از این صفحه میتوان برای مدیریت منو  ها استفاده کرد",
};

async function MenusPage({ searchParams }: TParams) {
  const { page, q } = await searchParams;
  const { allMenus, counts }: any = await getAllMenus(+page, q as string);
  return (
    <div>
      <Title name="ایجاد منو" />
      <AddNewMenu />
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-3">
        <Title name="لیست منو" />
        <Search />
      </div>
      <MenusList menus={JSON.parse(JSON.stringify(allMenus))} count={counts} />
    </div>
  );
}

export default MenusPage;
