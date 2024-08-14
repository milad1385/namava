"use client";
import "swiper/css";
import "swiper/css/navigation";
import React, { useState } from "react";
import SliderTitle from "./SiderTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, Navigation } from "swiper/modules";
import { GrCircleInformation } from "react-icons/gr";
import { FaPlay } from "react-icons/fa6";
import IMBD from "@/icons/IMBD";
import Plus from "@/icons/Plus";
import Like from "@/icons/Like";
import Dislike from "@/icons/Dislike";
import Movie from "../Movie/Movie";
import Link from "next/link";

type TMovieSlider = { title: string; link?: string; movies: any };
function MovieSlider({ title, link, movies }: TMovieSlider) {
  const [movieId, setMovieId] = useState<string | null>(null);
  const [movieDetail, setMovieDetail] = useState<any>(null);
  return (
    <div>
      <div className="container">
        <SliderTitle title={title} link={link} key={crypto.randomUUID()} />
        <div className="my-10  md:h-[21rem]">
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            autoplay={true}
            className="mySwiper"
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
                slidesPerView: 3,
              },
              1260: {
                slidesPerView: 7,
              },
            }}
          >
            {movies.map((movie: any) => (
              <SwiperSlide
                key={movie._id}
                onClick={() => {
                  setMovieId(movie._id);
                  setMovieDetail(movie);
                  window.scrollTo({
                    behavior: "smooth",
                    top: 1800,
                  });
                }}
              >
                <div
                  className={`transition-all group ${
                    movieId === movie._id ? "md:pt-[20px]" : ""
                  }`}
                >
                  <Movie
                    image={movie.mainImage}
                    link={movie.link}
                    title={movie.title}
                    type={movie.type}
                    showTime={movie.showTime}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {movieId && (
        <div className="my-10 hidden md:block">
          <div className="flex items-end justify-between flex-row-reverse relative movie-perview">
            <Image
              className="md:h-[539px] aspect-video  w-[75%]  static"
              src={movieDetail.deskBanner}
              width={1519}
              height={534}
              alt={movieDetail.title}
            />
            <div className="w-[25%]  z-20 right-10 md:h-[539px] rigth-side">
              <div className="relative top-[23%] right-10">
                <span className="block text-white text-center md:text-right text-base md:text-[22px]">
                  {movieDetail.title}
                </span>
                <div className="hidden md:flex items-center gap-x-5 font-Dana text-white text-sm mt-5">
                  <span className="bg-orange-400 text-sm rounded-full px-1.5">
                    {movieDetail.ageRange}+
                  </span>
                  <span>{movieDetail.showTime}</span>
                  <span>{movieDetail.time} دقیقه</span>
                  <div className="flex items-center gap-x-1">
                    <IMBD />
                    <span className="mt-0.5">{movieDetail.IMDB}</span>
                  </div>
                </div>
                <p className="hidden md:block static w-[614px]  text-white text-xs leading-6 mt-5">
                  {movieDetail.shortDesc}
                </p>
                <p className="my-3 text-white text-xs/6  text-center md:text-right">
                  اکازیون، چهارشنبه ها ساعت ۸ صبح به صورت اختصاصی در نماوا
                </p>
                <div className="flex items-center justify-center w-[500px] md:justify-start gap-x-4 mt-4">
                  <button className="bg-white text-namavaBlack hover:bg-namava hover:text-white flex items-center gap-x-2 justify-between text-xs py-3 px-5 rounded-xl">
                    <FaPlay />
                    خرید اشتراک
                  </button>
                  <button className="flex-center py-3 px-3  bg-gray-500/35  rounded-full text-[13px]">
                    <Plus />
                  </button>
                  <button className="flex-center py-3 px-3  bg-gray-500/35  rounded-full text-[13px]">
                    <Like fill="white" />
                  </button>
                  <button className="flex-center py-3 px-3  bg-gray-500/35  rounded-full text-[13px]">
                    <Dislike fill="white" />
                  </button>
                  <Link
                    href={`/movie/${movieDetail.link}`}
                    className="hidden md:flex items-center  text-sm gap-x-2 text-white hover:text-namava"
                  >
                    <GrCircleInformation className="text-3xl" />
                    اطلاعات بیشتر
                  </Link>
                </div>
                <p className="text-xs hidden md:flex text-[#ccc] mt-5 items-center gap-x-1">
                  ستارگان :{" "}
                  <div className="flex items-center">
                    {movieDetail.actors.slice(0, 4).map((actor: any) => (
                      <Link
                        key={actor._id}
                        href={`/biography/${actor.link}`}
                        className="ml-2 block"
                      >
                        {actor.name}
                      </Link>
                    ))}
                  </div>
                </p>
                <p className="text-xs hidden md:block text-[#ccc] mt-5">
                  کارگردان : {movieDetail.director}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieSlider;
