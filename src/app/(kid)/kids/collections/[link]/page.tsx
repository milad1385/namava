import Movie from "@/src/components/modules/main/Movie/Movie";
import { getCollection } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

async function page({ params }: TParams) {
  const collcetion = await getCollection(params.link as string);
  const { title, description, desktopBanner, movies, mobileBanner, mainImage } =
    collcetion;

  return (
    <>
      <div className="relative z-20 kid-layout min-h-[65vh] md:min-h-[100vh] text-white mt-16">
        <Image
          className={`w-full title-image hidden lg:block`}
          src={desktopBanner}
          alt={title}
          width={1920}
          height={1080}
        />
        <Image
          className="w-full title-image block lg:hidden"
          src={mobileBanner}
          alt={title}
          width={1920}
          height={1080}
        />
        <div className="title-overlay absolute inset-0"></div>
        <div className="bottom-8 md:bottom-16 absolute z-30 container px-10">
          <img
            src={mainImage}
            width={1920}
            height={1080}
            alt={title}
            className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] rounded-full mb-2 mx-auto md:mx-0 md:mb-10"
          />
          <h1 className="text-lg text-center md:text-right md:text-3xl text-namavaBlack">
            مجموعه فیلم های {title}
          </h1>
          <p className="hidden md:block text-justify text-namavaBlack line-clamp-3 md:line-clamp-6 max-w-[673px] pt-5 text-sm md:text-base/[28px]">
            {description}
          </p>
        </div>
      </div>

      <div className="container grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-16 pt-10 text-white pb-20 -mt-12 md:-mt-20 relative z-20 ">
        {movies.map((movie: any) => (
          <Movie
            key={movie._id}
            title={movie.title}
            image={movie.mainImage}
            link={movie.link}
            type={movie.type}
            showTime={movie.showTime}
            contentType={movie.contentType}
            isLink
          />
        ))}
      </div>
    </>
  );
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const collection = await getCollection(params.link as string);
  return {
    title: `مجموعه ${collection.title}`,
    description: `${collection.description}`,
    keywords: `مجموعه فیلم ، ${collection.title} ، یکپارچه ، اطلاعات ، لیست`,
  };
}


export default page;
