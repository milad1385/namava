import connectToDB from "@/src/configs/db";
import { NextResponse } from "next/server";
import MovieModel from "@/src/models/movie";

export async function GET(req: Request, { params }) {
  try {
    await connectToDB();
    const seriesID = params.id;
    const seriesSeasonNumber = await MovieModel.findOne(
      { _id: seriesID },
      "-_id season",
    );

    return NextResponse.json(seriesSeasonNumber, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "مشکلی پیش آمده است" },
      { status: 500 },
    );
  }
}
