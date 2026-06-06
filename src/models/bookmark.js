import mongoose from "mongoose";
import MovieModel from "./movie";
import UserModel from "./user";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Bookmark || mongoose.model("Bookmark", schema);

export default model;
