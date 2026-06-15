"use client";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Collection from "./Collection";

interface Collections {
  title: string;
  collections: any;
}
function Collections({ title, collections }: Collections) {
  return (
    <div className="container pb-10 md:pt-10 md:pb-20">
      <h3 className="font-IranMedium text-base md:text-lg">{title}</h3>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        autoplay={true}
        className="mySwiper my-5"
        modules={[Navigation, Autoplay]}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          568: {
            slidesPerView: 2,
          },
          800: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {collections.map((collection: any) => (
          <SwiperSlide key={collection._id}>
            <Collection
              image={collection.mainImage}
              title={collection.title}
              link={collection.link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Collections;
