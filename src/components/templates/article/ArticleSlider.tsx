"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ArticleBox from "./ArticleBox";
import { TArticle } from "@/src/libs/types";

function ArticleSlider({ articles }: { articles: TArticle[] }) {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      autoplay={true}
      loop={true}
      className="mySwiper"
      navigation={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        568: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        },
        1260: {
          slidesPerView: 4,
        },
      }}
    >
      {articles.map((article) => (
        <SwiperSlide key={article._id}>
          <ArticleBox
            title={article.title}
            createdAt={new Date(article.createdAt).toLocaleDateString("fa-IR")}
            image={article.image}
            readingTime={5}
            link={article.link}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ArticleSlider;
