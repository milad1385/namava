import EditUser from "@/src/components/templates/p-user/EditUser";
import EditUserInfo from "@/src/components/templates/p-user/EditUserInfo";
import { authUser } from "@/src/utils/serverHelper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ویرایش اطلاعات کاربری",
};

async function page() {
  const user = await authUser();
  return (
    <div className="space-y-6">
      <EditUser user={JSON.parse(JSON.stringify(user))} />
      <EditUserInfo />
    </div>
  );
}

export default page;
