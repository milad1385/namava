import Search from "@/src/components/modules/p-admin/Search";
import Title from "@/src/components/modules/p-admin/Title";
import AddUser from "@/src/components/templates/p-admin/users/AddUser";
import UsersList from "@/src/components/templates/p-admin/users/UsersList";
import { getAllUsers } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "کاربران",
  description: "از این صفحه میتوان برای مدیریت کاربران استفاده کرد",
};

async function UsersPage({ searchParams }: TParams) {
  const { page, q } = await searchParams;
  const { users, counts }: any = await getAllUsers(+page, q as string);
  return (
    <>
      <Title name="ایجاد کاربر" />
      <AddUser />
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-3">
        <Title name="لیست کاربران" />
        <Search />
      </div>
      <UsersList counts={counts} users={JSON.parse(JSON.stringify(users))} />
    </>
  );
}

export default UsersPage;
