"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

import Image from "next/image";
import Link from "next/link";

function Slider({ slides }: any) {
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="px-4 md:px-0 mt-5 md:mt-10 relative bottom-[47px]">
      <Swiper
        slidesPerView={3}
        spaceBetween={15}
        autoplay={true}
        className="mySwiper md:!px-[50px]"
        modules={[Navigation, Autoplay]}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          568: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {[...slides]
          .reverse()
          .slice(0, 15)
          .map((slide: any) => {
            const isLoaded = loadedImages[slide._id] || false;

            return (
              <SwiperSlide key={slide._id}>
                <Link
                  href={`/${slide.type === "film" ? "movie" : "series"}/${
                    slide.link
                  }`}
                  className="relative block"
                >
                  <div className="relative w-full aspect-[490/186]">
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-gray-700 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      </div>
                    )}

                    <Image
                      src={slide.deskBanner}
                      alt={slide.title}
                      width={490}
                      height={186}
                      onLoad={() => handleImageLoad(slide._id)}
                      className={`rounded-xl w-full h-full object-cover transition-opacity duration-300 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/25 rounded-xl"></div>
                  <h3 className="absolute z-20 text-white bottom-6 right-6">
                    {slide.title}
                  </h3>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default Slider;