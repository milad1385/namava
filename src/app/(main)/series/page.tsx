import HeaderSlider from "@/src/components/templates/index/Header/Slider";
import Slider from "@/src/components/templates/index/Slider/Slider";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import MiniSpinner from "@/src/components/modules/spinner/MiniSpinner";
import MainSlider from "@/src/components/templates/index/mainSlider/MainSlider";
import {
  checkUserProfile,
  checkUserSubscription,
  getAllSlidersMovies,
} from "@/src/libs/service/services";

export default async function Home() {
  const [slides, subscription, profile]: any = await Promise.all([
    getAllSlidersMovies("series"),
    checkUserSubscription(),
    checkUserProfile(),
  ]);

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
        <MainSlider type="series"  />
      </Suspense>
    </>
  );
}
