import WatchLimit from "@/src/components/templates/profile/WatchLimit";
import {
  getAllMoviesWithOutPagination,
  getSpecificProfile,
} from "@/src/libs/service/services";

async function page({ params }: { params: { id: string } }) {
  const [profile, movies] = await Promise.all([
    getSpecificProfile(params?.id),
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
