"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function MainSlider({ articles }: any) {
  return (
    <>
      <Swiper pagination={{ clickable: true }} modules={[Pagination]}>
        {articles.map((article: any) => (
          <SwiperSlide key={article._id}>
            <Link href={`/blog/${article.link}`}>
              {" "}
              <Image
                src={article.image}
                alt={article.title}
                className="rounded-t-md h-[350px] object-cover"
                width={1920}
                height={1080}
              />
              <div className="px-4 py-3 space-y-4 md:space-y-2 bg-milafilmBlack rounded-b-md">
                <h2 className="text-white text-sm md:text-base font-IranMedium">
                  {article.title}
                </h2>
                <div className="text-[#ebebeb] text-[10px] md:text-[13px] flex items-center gap-x-4">
                  <div>
                    <span>نویسنده : </span>
                    <span>{article.creator.name}</span>
                  </div>
                  <span className="w-px h-3.5 bg-[#aaa]"></span>
                  <div>
                    {new Date(article.createdAt).toLocaleDateString("fa-IR")}
                  </div>
                  <span className="w-px h-3.5 bg-[#aaa]"></span>
                  <div>
                    <span>زمان مطالعه : </span>
                    <span>{article.readingTime} دقیقه</span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default MainSlider;
