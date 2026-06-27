import EditUser from "@/src/components/templates/p-user/EditUser";
import EditUserInfo from "@/src/components/templates/p-user/EditUserInfo";
import { getAllSubcategories } from "@/src/libs/service/services";
import { authUser } from "@/src/utils/serverHelper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ویرایش اطلاعات کاربری",
};

async function page() {
  const [user, subCategories] = await Promise.all([
    authUser(),
    getAllSubcategories(),
  ]);
  const subCategoriesItems = subCategories.map((category: any) => ({
    label: category.title,
    value: category._id,
    id: category._id,
  }));
  return (
    <div className="space-y-6">
      <EditUser user={JSON.parse(JSON.stringify(user))} />
      <EditUserInfo
        subCategories={JSON.parse(JSON.stringify(subCategoriesItems))}
        user={JSON.parse(JSON.stringify(user))}
      />
    </div>
  );
}

export default page;
