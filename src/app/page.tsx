import HeaderSlider from "@/src/components/templates/index/Header/Slider";
import { redirect } from "next/navigation";
import MainSlider from "../components/templates/index/mainSlider/MainSlider";
import {
  checkUserProfile,
  checkUserSubscription,
  getAllSlidersMovies,
} from "../libs/service/services";

export default async function Home() {
  const [slides, subscription]: any = await Promise.all([
    getAllSlidersMovies(),
    checkUserSubscription(),
  ]);
  return (
    <>
      <HeaderSlider
        subscription={JSON.parse(JSON.stringify(subscription))}
        slides={JSON.parse(JSON.stringify(slides))}
      />
      <MainSlider />
    </>
  );
}
