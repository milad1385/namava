"use client";
import Image from "next/image";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

function AnimsSlider({ collections }: any) {
  return (
    <div className="pt-16 pb-5 md:py-24 container">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        // centeredSlides={true}
        autoplay={true}
        // loop={true}
        className="mySwiper !py-5"
        modules={[Navigation, Autoplay]}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          568: {
            slidesPerView: 3,
          },
          800: {
            slidesPerView: 4,
          },
          1260: {
            slidesPerView: 5,
          },
        }}
      >
        {collections.map((collection: any) => (
          <SwiperSlide key={collection._id}>
            <Link title={collection.title} href={`/kids/collections/${collection.link}`}>
              <Image
                src={collection.mainImage}
                alt={collection.title}
                width={500}
                height={500}
                className="w-[300px]  anim-collection h-auto  rounded-full shadow-sm"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AnimsSlider;
