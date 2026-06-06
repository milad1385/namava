import ArticleSlider from "@/src/components/templates/article/ArticleSlider";
import MainSlider from "@/src/components/templates/article/MainSlider";
import { getArticles } from "@/src/libs/service/services";
import { TArticle } from "@/src/libs/types";
import { Metadata } from "next";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "مقاله های ما",
  description:
    "در این صفحه تمامی مقاله های سایت ما را مشاهده میکنید که هر یک از آنها در مورد یکی از آثار فیلم و سریال میباشد",
  keywords: "مقاله ها ، خواندنی ، جالب ، راز آلود ",
};

async function page() {
  const articles: TArticle[] = await getArticles();
  
  return (
    <div className="max-w-[1200px] container mx-auto  my-24">
      <MainSlider articles={JSON.parse(JSON.stringify(articles))} />
      <div className="mt-10">
        <div className="text-white flex items-center justify-between mb-6">
          <p className="text-base md:text-lg font-IranMedium">آخرین مطالب</p>
          <Link
            href={""}
            className="flex items-center gap-x-2 hover:bg-namava hover:text-white px-3 py-1.5 rounded-md transition-all"
          >
            مشاهده بیشتر
            <FaChevronLeft />
          </Link>
        </div>
        <ArticleSlider articles={JSON.parse(JSON.stringify(articles))} />
      </div>
      <div className="mt-10">
        <div className="text-white flex items-center justify-between mb-6">
          <p className="text-base md:text-lg font-IranMedium">مطالب پر مخاطب</p>
          <Link
            href={""}
            className="flex items-center gap-x-2 hover:bg-namava hover:text-white px-3 py-1.5 rounded-md transition-all"
          >
            مشاهده بیشتر
            <FaChevronLeft />
          </Link>
        </div>

        <ArticleSlider
          articles={JSON.parse(JSON.stringify(articles.reverse()))}
        />
      </div>
    </div>
  );
}

export default page;
