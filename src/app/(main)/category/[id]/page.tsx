import MiniSpinner from "@/src/components/modules/spinner/MiniSpinner";
import HeaderSlider from "@/src/components/templates/index/Header/Slider";
import MainSlider from "@/src/components/templates/index/mainSlider/MainSlider";
import Slider from "@/src/components/templates/index/Slider/Slider";
import {
  checkUserProfile,
  checkUserSubscription,
  getCategoryInfo,
  getMoviesByCategory,
} from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home({ params }: TParams) {
  const { id } = await params;
  const [slides, subscription, profile]: any = await Promise.all([
    getMoviesByCategory(id as string),
    checkUserSubscription(),
    checkUserProfile(),
  ]);

  if (slides.length === 0) {
    notFound();
  }

  if (profile.type === "kid") {
    redirect("/kids");
  }

  return (
    <>
      <HeaderSlider
        subscription={JSON.parse(JSON.stringify(subscription))}
        slides={JSON.parse(JSON.stringify(slides))}
      />
      <Slider slides={JSON.parse(JSON.stringify(slides))} />
      <Suspense fallback={<MiniSpinner />}>
        <MainSlider categoryId={id as string} />
      </Suspense>
    </>
  );
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategoryInfo(id as string);
  return {
    title: `فیلم و سریال ${category.title}`,
    description: `${category.description}`,
    keywords: `${category.title} ، اطلاعات ، فیلتر ، دسته بندی`,
  };
}
