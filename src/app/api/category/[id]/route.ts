import connectToDB from "@/src/configs/db";
import { TParams } from "@/src/libs/types";
import CategoryModel from "@/src/models/category";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: TParams) {
  try {
    connectToDB();
    const mainCategories = await CategoryModel.findOne({ _id: params.id });
    return Response.json(mainCategories);
  } catch (err) {
    return Response.json({ err: "interval server err" }, { status: 500 });
  }
}
