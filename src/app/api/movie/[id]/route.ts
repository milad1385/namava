import connectToDB from "@/src/configs/db";
import CategoryModel from "@/src/models/category";
import MovieModel from "@/src/models/movie";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }) {
  try {
    connectToDB();
    let movie = await MovieModel.findOne({ _id: params.id })
      .populate("category actors", "link image title name")
      .populate({
        path: "comments",
        match: { isAccept: true },
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .lean();

    let categories: any = {};

    const category = await CategoryModel.findById(movie.category._id).lean();

    const parrentCategory = await CategoryModel.find({
      _id: category.parrent,
    }).lean();

    categories = {
      allCategories: [...parrentCategory, category],
    };

    movie.categories = categories.allCategories;

    return NextResponse.json(movie);
  } catch (error) {
    return Response.json({ error: "خطا در دریافت فیلم" }, { status: 500 });
  }
}
