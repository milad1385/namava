import CategoryCard from "@/src/components/templates/category/CategoryCard";
import { getCategories } from "@/src/libs/service/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "دسته بندی ها",
  description:
    "این صفحه مربوط به انواع دسته بندی ها در سایت میلا فیلم میباشد و شما میتوانید فیلم های خود را در هر دسته بندی بت پروتکب مشاهدهکنید",
  keywords: "دسته بندی ، اکشن ، کمدی",
};

async function Categories() {
  const categories: any = await getCategories();

  return (
    <div className="text-white container pt-20 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {categories.map((category: any) => (
          <CategoryCard
            key={category._id}
            image={category.image}
            title={category.title}
            link={`/category/${category._id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Categories;
