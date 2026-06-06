import Movie from "@/src/components/modules/main/Movie/Movie";
import { getCollection } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

async function page({ params }: TParams) {
  const collcetion = await getCollection(params.link as string);
  const { title, description, desktopBanner, movies, mobileBanner } =
    collcetion;
  return (
    <>
      <div className="relative z-20 header-video min-h-[70vh] md:min-h-[95vh] text-white">
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
        <div className="bottom-24 absolute z-30 container px-10">
          <h1 className="text-lg text-center md:text-right md:text-3xl">
            {title}
          </h1>
          <p className="text-justify line-clamp-3 md:line-clamp-6 max-w-[673px] pt-5 text-sm md:text-base/[28px]">
            {description}
          </p>
        </div>
      </div>

      <div className="container grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-16 pt-10 text-white pb-20 -mt-16 relative z-20 ">
        {movies.map((movie: any) => (
          <Movie
            key={movie._id}
            title={movie.title}
            image={movie.mainImage}
            link={movie.link}
            type={movie.type}
            showTime={movie.showTime}
            isLink
            contentType={movie.contentType}
          />
        ))}
      </div>
    </>
  );
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const collection = await getCollection(params.link as string);
  return {
    title: `${collection.title}`,
    description: `${collection.description}`,
    keywords: `مجموعه فیلم ، ${collection.title} ، یکپارچه ، اطلاعات ، لیست`,
  };
}

export default page;
