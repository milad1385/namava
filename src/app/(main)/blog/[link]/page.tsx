import Button from "@/src/components/modules/auth/Button/Button";
import { getArticle } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLink, FaTelegram, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const ArticleBody = dynamic(
  () => import("@/src/components/templates/article/ArticleBody"),
  { ssr: false }
);


async function ArticlePage({ params }: TParams) {
  const article = await getArticle(params.link as string);

  const articleCreatedTime = new Date(article.createdAt);
  return (
    <>
      <div className="max-w-[800px] mx-auto shadow-2xl bg-namavaBlack text-white mt-28 rounded-md">
        <h3 className="text-base md:text-xl font-IranMedium p-5">
          {article.title}
        </h3>
        <Image
          src={article.image}
          width={1920}
          height={1080}
          alt="shogan.jpg"
          className="h-[350px] object-cover"
        />
        <div className="p-5">
          {/* author info */}
          <div className="flex items-center gap-x-4 text-xs">
            <Image
              src="/images/user.png"
              alt="user.png"
              width={1920}
              height={1080}
              className="md:w-10 w-8 h-8 md:h-10 rounded-full"
            />
            <div className="flex items-center flex-wrap gap-y-2 gap-x-2">
              <span>نویسنده : </span>
              <Link href="/" className="text-namava">
                {article.creator.name}
              </Link>
              <span>{articleCreatedTime.toLocaleDateString("fa-IR")}</span>
              <span>
                {articleCreatedTime.getHours() < 10
                  ? `0${articleCreatedTime.getHours()}`
                  : articleCreatedTime.getHours()}{" "}
                :{" "}
                {articleCreatedTime.getMinutes() < 10
                  ? `0${articleCreatedTime.getMinutes()}`
                  : articleCreatedTime.getMinutes()}
              </span>
              <span className="block w-px h-4 bg-slate-400"></span>
              <span>زمان مطالعه : </span>
              <span>{article.readingTime} دقیقه</span>
            </div>
          </div>

          <Link
            href={`/${article.movie.type === "film" ? "movie" : "series"}/${
              article.movie.link
            }`}
            className="border flex-center w-[300px] text-sm text-namava hover:bg-namava transition-all hover:text-white border-namava px-2 py-2 rounded-md mt-5"
          >
            تماشا {article.movie.title} در نماوا
          </Link>

          <h3 className="font-IranMedium my-8">
            مجله نماوا ، {article.creator.name}{" "}
          </h3>

          <ArticleBody content={JSON.parse(JSON.stringify(article.content))} />
          {/* tags */}
          <div className="text-sm flex items-center flex-wrap gap-x-4 mb-6">
            <span className="font-IranMedium">واژگان کلیدی : </span>
            <p className="text-xs/[26px]">{article.tags.join(" , ")}</p>
          </div>
          {/* share */}
          <div className="text-sm flex md:items-center gap-4 flex-col md:flex-row">
            <span className="text-sm">اشتراک گذاری : </span>
            <div className="flex items-center flex-wrap gap-4">
              <div className="bg-[#121212] w-[120px] flex-center gap-x-2 py-3 rounded-md cursor-pointer">
                <FaTelegram className="text-xl" />
                تلگرام
              </div>
              <div className="bg-[#121212] w-[120px] flex-center gap-x-2 py-3 rounded-md cursor-pointer">
                <FaWhatsapp className="text-xl" />
                واتس اپ
              </div>
              <div className="bg-[#121212] w-[120px] flex-center gap-x-2 py-3 rounded-md cursor-pointer">
                <FaTwitter className="text-xl" />
                توییتر
              </div>
              <div className="bg-[#121212] w-[120px] flex-center gap-x-2 py-3 rounded-md cursor-pointer">
                <FaLink className="text-xl" />
                ارسال لینک
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] flex items-center gap-x-4 mx-auto shadow-2xl bg-namavaBlack text-white my-10  rounded-md p-5">
        <Image
          src={article.movie.mainImage}
          alt={article.movie.title}
          width={1920}
          height={1080}
          className="w-[120px] h-[176px] rounded-md"
        />
        <Link
          href={`/${article.movie.type === "film" ? "movie" : "series"}/${
            article.movie.link
          }`}
          className="space-y-10 block"
        >
          <h3>{article.movie.title}</h3>
          <Button className="!w-[150px] md:!w-[200px]">تماشا در نماوا</Button>
        </Link>
      </div>
    </>
  );
}


export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const article = await getArticle(params.link as string);
  return {
    title: `${article.title}`,
    description: `محتوا مقاله مورد نظر در این صفحه قابل خواندن میباشد`,
    keywords:"مقاله ، محتوا ، کلمات کلیدی ، نویسنده",
  };
}


export default ArticlePage;
