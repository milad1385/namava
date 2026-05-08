import FavList from "@/src/components/templates/p-user/FavList";
import { getLikesMovies } from "@/src/libs/service/services";
import { IWishList, TParams } from "@/src/libs/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لیست مورد علایق",
};

async function page({ searchParams }: TParams) {
  const { page } = await searchParams;
  const { movies, count }: IWishList = await getLikesMovies(+page);
  return (
    <>
      <FavList movies={JSON.parse(JSON.stringify(movies))} count={count} />
    </>
  );
}

export default page;
