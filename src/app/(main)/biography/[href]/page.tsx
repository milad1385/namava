import Movie from "@/src/components/modules/main/Movie/Movie";
import ShowMore from "@/src/components/templates/biography/ShowMore";
import { getStar, getStarMovies } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const { href } = params;
  const { name, bio } = await getStar(href as string);
  return {
    title: `بیوگرافی ${name}`,
    description: `${bio} در این صفحه بیوگرافی ستاره محبوب شما ${name} است پس بریم که داستان زندگی این سوپر استار رو بشنویم`,
    keywords :"بیوگرافی ، بازیگر ، سوپر استار ، زندگی نامه",
  };
}

async function page({ params }: TParams) {
  const { href } = params;

  const { image, name, bio, _id } = await getStar(href as string);
  const actorMovies: any = await getStarMovies(_id);

  return (
    <div className="container text-white py-20 relative">
      <div className="block sm:hidden absolute top-0 left-0 right-0 -z-20">
        <Image className="" alt="" width={1920} height={1080} src={image} />
        <div className="absolute inset-0 bg-black/80 -z-0"></div>
      </div>
      <div className="flex flex-col items-center md:items-start md:flex-row  gap-x-5 pb-16">
        <div className="shrink-0">
          <Image
            src={image}
            alt={name}
            title={name}
            width={180}
            height={180}
            className="w-[180px] h-[180px] rounded-full"
          />
        </div>
        <div>
          <h1 className="text-lg  font-IranMedium md:text-2xl mt-5 md:m-0 text-center md:text-right ">
            بیوگرافی {name}
          </h1>
          <div className="text-xs/[25px] md:text-sm/[25px] mt-[45px] text-justify max-h-[100px] md:h-auto relative overflow-hidden">
            {bio}
            <div className="block md:hidden absolute bottom-0  right-0 left-0 h-[160px] bg-gradient-to-t from-[#121212] from-0%   to-100%"></div>
          </div>
        </div>

        <ShowMore bio={bio} />
      </div>
      <div>
        <h2 className="text-base md:text-lg font-IranMedium">
          فیلم های {name}
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-x-4 gap-y-16 pt-10">
          {actorMovies.map((movie: any) => (
            <Movie
              key={movie._id}
              title={movie.title}
              image={movie.mainImage}
              isLink
              link={movie.link}
              showTime={movie.showTime}
              type={movie.type}
              contentType={"adult"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
