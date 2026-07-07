import connectToDB from "@/src/configs/db";
import { TParams } from "@/src/libs/types";
import EpisodeModel from "@/src/models/episode";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: TParams) {
  try {
    await connectToDB();
    const episode = await EpisodeModel.findOne({
      series: params.id,
    });
    return Response.json(episode);
  } catch (err) {
    return Response.json({ err: "interval server err" }, { status: 500 });
  }
}
