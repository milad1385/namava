import Title from "@/src/components/modules/p-admin/Title";
import AddUser from "@/src/components/templates/p-admin/users/AddUser";
import { getUserInfo } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import React from "react";

async function page({ params }: TParams) {
  const user = await getUserInfo(params?.id as string);

  return (
    <>
      <Title name="ویرایش کاربر" />
      <AddUser status="update" user={JSON.parse(JSON.stringify(user))} />
    </>
  );
}

export default page;
