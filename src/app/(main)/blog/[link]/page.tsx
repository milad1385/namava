import Button from "@/src/components/modules/auth/Button/Button";
import { getArticle } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import Share from "@/src/components/templates/article/Share";
const ArticleBody = dynamic(
  () => import("@/src/components/templates/article/ArticleBody"),
  { ssr: false },
);

async function ArticlePage({ params }: TParams) {
  const article = await getArticle(params.link as string);

  const articleCreatedTime = new Date(article.createdAt);
  return (
    <>
      <div className="max-w-[800px] mx-auto shadow-2xl bg-milafilmBlack text-white mt-28 rounded-md">
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
              <Link href="/" className="text-milafilm">
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
            className="border flex-center w-[300px] text-sm text-milafilm hover:bg-milafilm transition-all hover:text-white border-milafilm px-2 py-2 rounded-md mt-5"
          >
            تماشا {article.movie.title} در میلا فیلم
          </Link>

          <h3 className="font-IranMedium my-8">
            مجله میلا فیلم ، {article.creator.name}{" "}
          </h3>

          <ArticleBody content={JSON.parse(JSON.stringify(article.content))} />
          {/* tags */}
          <div className="text-sm flex items-center flex-wrap gap-x-4 mb-6">
            <span className="font-IranMedium">واژگان کلیدی : </span>
            <p className="text-xs/[26px]">{article.tags.join(" , ")}</p>
          </div>
          {/* share */}
          <Share
            title="سایت فیلم و سریال میلا فیلم"
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params.link}`}
            description="تماشای آنلاین فیلم و سریال در سایت فیلم میلا فیلم. دانلود و تماشای آنلاین جدیدترین فیلم و سریال ایرانی و خارجی با قابلیت دانلود رایگان در میلا فیلم."
          />
        </div>
      </div>

      <div className="max-w-[800px] flex items-center gap-x-4 mx-auto shadow-2xl bg-milafilmBlack text-white my-10  rounded-md p-5">
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
          <Button className="!w-[150px] md:!w-[200px]">
            تماشا در میلا فیلم
          </Button>
        </Link>
      </div>
    </>
  );
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const article = await getArticle(params.link as string);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com';
  const articleUrl = `${baseUrl}/blog/${params.link}`;
  const imageUrl = article.image?.startsWith('http') 
    ? article.image 
    : `${baseUrl}${article.image?.startsWith('/') ? '' : '/'}${article.image}`;
  
  const description = `در میلا فیلم به تماشای مقاله ${article.title} بپردازید و از جدیدترین اخبار و نقدهای سینمایی لذت ببرید.`;

  return {
    title: article.title,
    description: description,
    keywords: article.tags?.join(', ') || 'مقاله، فیلم، سریال، نقد',
    openGraph: {
      title: article.title,
      description: description,
      url: articleUrl,
      siteName: 'میلا فیلم',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'fa_IR',
      type: 'article',
      publishedTime: article.createdAt,
      authors: [article.creator?.name || 'میلا فیلم'],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: description,
      images: [imageUrl],
    },
    
    alternates: {
      canonical: articleUrl,
    },
  };
}

export default ArticlePage;
