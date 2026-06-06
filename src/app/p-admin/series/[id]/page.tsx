import Search from "@/src/components/modules/p-admin/Search";
import Title from "@/src/components/modules/p-admin/Title";
import SessionList from "@/src/components/templates/p-admin/film/SessionList";
import { getAllEpisodes } from "@/src/libs/service/services";
import { TAdminPage, TParams } from "@/src/libs/types";
import { Metadata } from "next";
import React from "react";

async function page({ params, searchParams }: TAdminPage) {
  const { episodes, counts, name }: any = await getAllEpisodes(
    +searchParams.page,
    searchParams.q,
    params.id
  );
  return (
    <>
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-y-3">
        <Title name={`سریال ${name}`} />;
        <Search />
      </div>

      <SessionList
        episodes={JSON.parse(JSON.stringify(episodes))}
        counts={counts}
      />
    </>
  );
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const series: any = await getAllEpisodes(1, "", params?.id as string);
  return {
    title: ` قسمت های سریال  ${series.name}`,
  };
}

export default page;
