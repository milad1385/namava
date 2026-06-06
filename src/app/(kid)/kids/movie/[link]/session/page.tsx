import VideoContent from "@/src/components/modules/main/Movie/VideoContent";
import { checkUserSubscription, getMovie } from "@/src/libs/service/services";
import { notFound } from "next/navigation";
import { TParams } from "@/src/libs/types";

async function page({ params }: TParams) {
  const subscription = await checkUserSubscription();

  if (!subscription.hasSubscription) {
    notFound();
  }

  const movie = await getMovie(params.link);

  if (!movie) {
    notFound();
  }

  return (
    <div className="py-28 container px-2">
      <VideoContent movie={JSON.parse(JSON.stringify(movie))} />
    </div>
  );
}

export default page;
