"use client";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import Header from "./Header";
import { Swiper, SwiperSlide } from "swiper/react";

function Slider({ slides, subscription }: any) {
  const [swipe, setSwipe] = useState();
  return (
    <div>
      <Swiper
        onBeforeInit={(swipper: any) => setSwipe(swipper)}
        spaceBetween={30}
        effect={"fade"}
        modules={[EffectFade, Autoplay]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide: any) => (
          <SwiperSlide key={slide._id}>
            <Header
              onSwipe={swipe}
              img={slide.deskBanner}
              isImage
              info={slide}
              subscription={subscription}
              bookmarks={[]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
