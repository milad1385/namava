import Search from "@/src/components/modules/p-admin/Search";
import Title from "@/src/components/modules/p-admin/Title";
import ActorsList from "@/src/components/templates/p-admin/actors/ActorsList";
import AddNewActor from "@/src/components/templates/p-admin/actors/AddNewActor";
import { getAllStars } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "بازیگران",
  description: "از این صفحه میتوان برای مدیریت بازیگر  ها استفاده کرد",
};

async function ActorsPage({ searchParams }: TParams) {
  const { page, q } = await searchParams;
  const { stars, counts }: any = await getAllStars(+page, q as string);
  return (
    <div>
      <Title name="ایجاد بازیگر" />
      <AddNewActor />
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-3">
        <Title name="لیست بازیگران و ستارگان" />
        <Search />
      </div>
      <ActorsList stars={JSON.parse(JSON.stringify(stars))} counts={counts} />
    </div>
  );
}

export default ActorsPage;
