import Title from "@/src/components/modules/p-admin/Title";
import AddNewActor from "@/src/components/templates/p-admin/actors/AddNewActor";
import { getActor } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";

async function page({ params }: TParams) {
  const { id } = await params;
  const actor = await getActor(id as string);

  return (
    <>
      <Title name="ویرایش بازیگر" />
      <AddNewActor status="update" actor={JSON.parse(JSON.stringify(actor))} />
    </>
  );
}

export default page;
