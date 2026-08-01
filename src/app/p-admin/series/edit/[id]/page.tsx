import Title from "@/src/components/modules/p-admin/Title";
import EditSeries from "@/src/components/templates/p-admin/film/EditSeries";
import { getAllSeries, getEpisode } from "@/src/libs/service/services";
import { TParams } from "@/src/libs/types";
import React from "react";

async function page({ params }: TParams) {
  const [episode, series] = await Promise.all([
    getEpisode(params.id as string),
    getAllSeries(),
  ]);
  return (
    <div>
      <Title name={`ویرایش قسمت ${episode.title}`} />
      <EditSeries
        episode={JSON.parse(JSON.stringify(episode))}
        series={JSON.parse(JSON.stringify(series))}
      />
    </div>
  );
}

export default page;
