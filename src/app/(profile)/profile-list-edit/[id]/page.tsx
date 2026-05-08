import WatchLimit from "@/src/components/templates/profile/WatchLimit";
import {
  getAllMoviesWithOutPagination,
  getSpecificProfile,
} from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";

async function page({ params }: TParams) {
  const { id } = await params;
  const [profile, movies] = await Promise.all([
    getSpecificProfile(id),
    getAllMoviesWithOutPagination(),
  ]);

  return (
    <WatchLimit
      movies={JSON.parse(JSON.stringify(movies))}
      profile={JSON.parse(JSON.stringify(profile))}
    />
  );
}

export default page;
