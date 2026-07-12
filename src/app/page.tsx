import HeaderSlider from "@/src/components/templates/index/Header/Slider";
import MainSlider from "../components/templates/index/mainSlider/MainSlider";
import {
  checkUserSubscription,
  getAllSlidersMovies
} from "../libs/service/services";

export default async function Home() {
  const [slides, subscription] = await Promise.all([
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
