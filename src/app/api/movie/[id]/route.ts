import connectToDB from "@/src/configs/db";
import MovieModel from "@/src/models/movie";
import { NextResponse } from "next/server";
import "@/src/models/category";
import "@/src/models/stars";

export async function GET(req: Request, { params }) {
  try {
    await connectToDB();

    const movie = await MovieModel.findOne({ _id: params.id })
      .populate({
        path: "category",
        populate: {
          path: "parrent",
          select: "_id title link image name",
        },
      })
      .populate("actors", "_id name image link title")
      .lean();

    if (!movie) {
      return Response.json({ msg: "فیلم یافت نشد" }, { status: 404 });
    }

    const categoryData = movie.category;
    const categories = [];

    if (categoryData?.parrent) {
      categories.push({
        _id: categoryData.parrent._id,
        title: categoryData.parrent.title,
        link: categoryData.parrent.link,
        image: categoryData.parrent.image,
        name: categoryData.parrent.name,
        isParent: true,
      });
    }

    categories.push({
      _id: categoryData._id,
      title: categoryData.title,
      link: categoryData.link,
      image: categoryData.image,
      name: categoryData.name,
      isParent: false,
    });

    movie.categories = categories;
    delete movie.category;

    return NextResponse.json(movie);
  } catch (error) {
    console.log("Error in GET movie:", error);
    return Response.json(
      {
        success: false,
        msg: error?.message || "خطایی رخ داده است",
      },
      { status: 500 },
    );
  }
}
