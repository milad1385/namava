import VideoContent from "@/src/components/modules/main/Movie/VideoContent";
import {
  checkUserSubscription,
  getEpisode,
  getMovie,
} from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { notFound } from "next/navigation";

async function page({ params }: TParams) {
  const subscription = await checkUserSubscription();

  if (!subscription.hasSubscription) {
    notFound();
  }

  const movie = await getMovie(params.link);
  const episode = await getEpisode(params.episodeId as string);

  if (!movie) {
    notFound();
  }

  return (
    <div className="py-20 md:py-28 container px-2">
      <VideoContent episode={JSON.parse(JSON.stringify(episode))} movie={JSON.parse(JSON.stringify(movie))} />
    </div>
  );
}

export default page;
