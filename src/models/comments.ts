import mongoose from "mongoose";
import MovieModel from "@/src/models/movie";
import UserModel from "@/src/models/user";

export interface IComment {
  user?: mongoose.Types.ObjectId;
  movie?: mongoose.Types.ObjectId;
  score?: number;
  content: string;
  liked?: mongoose.Types.ObjectId[];
  disliked?: mongoose.Types.ObjectId[];
  isSpoiled?: boolean;
  isAccept?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new mongoose.Schema<IComment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
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
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    disliked: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    isSpoiled: {
      type: Boolean,
      default: false,
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const model =
  mongoose.models?.Comment || mongoose.model<IComment>("Comment", schema);

export default model as any;
