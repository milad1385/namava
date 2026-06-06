import mongoose from "mongoose";
import movieModel from "./movie";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    link: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    movies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        default: [],
      },
    ],
    mainImage: {
      type: String,
      required: true,
    },
    desktopBanner: {
      type: String,
      required: true,
    },
    mobileBanner: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["kid", "adult"],
      default: "adult",
    },
  },
  { timestamps: true }
);

const model =
  mongoose.models.Collection || mongoose.model("Collection", schema);

export default model;
