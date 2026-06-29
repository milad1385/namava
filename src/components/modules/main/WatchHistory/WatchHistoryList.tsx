"use client";
import Link from "next/link";
import WatchHistoryItem from "./WatchHistoryItem";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { WatchHistoryListProps } from "@/src/libs/types";

function WatchHistoryList({
  history,
}: WatchHistoryListProps): React.ReactElement {
  if (!history || history.length === 0) {
    return null;
  }
  const historyLength = history?.length > 5;
  const inProgressCount = history.filter((item) => !item.isCompleted).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-IranMedium text-base md:text-lg text-white">
          تاریخچه تماشا
        </h2>
        <span className="text-sm text-gray-400">
          {inProgressCount} عنوان در حال تماشا
        </span>
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        autoplay={true}
        className="mySwiper"
        modules={[Autoplay]}
        navigation={historyLength}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          568: {
            slidesPerView: 2,
          },
          800: {
            slidesPerView: 3,
          },
          1260: {
            slidesPerView: 5,
          },
        }}
      >
        {history.map((item) => (
          <SwiperSlide key={item._id}>
            <WatchHistoryItem key={item._id} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default WatchHistoryList;
