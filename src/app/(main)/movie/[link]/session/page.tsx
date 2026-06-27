// import VideoContent from "@/src/components/modules/main/Movie/VideoContent";
// import { checkUserSubscription, getMovie } from "@/src/libs/service/services";
// import { TParams } from "@/src/libs/types";
// import { notFound } from "next/navigation";

import VideoContent from "@/src/components/modules/main/Movie/VideoContent";
import { checkUserSubscription, getMovie } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { notFound } from "next/navigation";

// async function page({ params }: TParams) {
//   const subscription = await checkUserSubscription();

//   if (!subscription.hasSubscription) {
//     notFound();
//   }

//   const movie = await getMovie(params.link);

//   if (!movie) {
//     notFound();
//   }

//   return (
//     <div className="my-28 container px-2">
//       <VideoContent movie={JSON.parse(JSON.stringify(movie))} />
//     </div>
//   );
// }

// export default page;

// app/movie/[link]/page.tsx

// 📌 تایپ Props

async function page({
  params,
  searchParams,
}: TParams): Promise<React.ReactElement> {
  const subscription = await checkUserSubscription();

  if (!subscription.hasSubscription) {
    notFound();
  }

  const movie = await getMovie(params.link);

  if (!movie) {
    notFound();
  }

  const startFromBeginning = searchParams?.start === "0";

  return (
    <div className="my-28 container px-2">
      <VideoContent
        movie={JSON.parse(JSON.stringify(movie))}
      />
    </div>
  );
}

export default page;
