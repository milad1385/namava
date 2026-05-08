import mongoose from "mongoose";
import MovieModel from "@/src/models/movie";
import UserModel from "@/src/models/user";
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
    score: {
      type: Number,
      default: 5,
    },
    content: {
      type: String,
      required: true,
    },
    liked: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    disliked: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
    isSpoiled: {
      type: Boolean,
      default: false,
    },

    isAccept: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.models?.Comment || mongoose.model("Comment", schema);

export default model;
