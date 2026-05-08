import Search from "@/src/components/modules/p-admin/Search";
import Title from "@/src/components/modules/p-admin/Title";
import SubCategoriesList from "@/src/components/templates/p-admin/categories/SubCategoriesList";
import { getSubCategory } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";

async function page({ params, searchParams }: TParams) {
  const { id } = await params;
  const { page, q } = await searchParams;
  const { subCategories, counts, parrent }: any = await getSubCategory(
    id as string,
    +page || 1,
    q as string,
  );

  return (
    <>
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-3">
        <Title name={`دسته بندی (${parrent.title})`} />
        <Search />
      </div>
      <SubCategoriesList
        subCategories={JSON.parse(JSON.stringify(subCategories))}
        count={counts}
      />
    </>
  );
}

export default page;
