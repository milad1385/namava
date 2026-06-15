import mongoose from "mongoose";
import movieModel from "./movie";

export interface ICollection {
  title: string;
  link: string;
  description: string;
  movies?: mongoose.Types.ObjectId[];
  mainImage: string;
  desktopBanner: string;
  mobileBanner: string;
  type?: "kid" | "adult";
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new mongoose.Schema<ICollection>(
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

const model = mongoose.models.Collection || mongoose.model<ICollection>("Collection", schema);

export default model;