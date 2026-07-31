import Title from "@/src/components/modules/p-admin/Title";
import AddNewMenu from "@/src/components/templates/p-admin/menus/AddNewMenu";
import { getMenu } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ویرایش منو ها",
  description: "از این صفحه میتوان برای ویرایش منو  ها استفاده کرد",
};

async function page({ params }: TParams) {
  const menu = await getMenu(params?.id as string);

  return (
    <div>
      <Title name={`ویرایش منو ${menu.title}`} />
      <AddNewMenu status="update" menu={JSON.parse(JSON.stringify(menu))} />
    </div>
  );
}

export default page;
