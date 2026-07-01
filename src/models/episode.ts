import mongoose, { Schema } from "mongoose";
import MovieModel from "./movie";
import UserModel from "@/src/models/user";

export interface IEpisode {
  title: string;
  description: string;
  link: string;
  time: string;
  image: string;
  liked?: mongoose.Types.ObjectId[];
  disliked?: mongoose.Types.ObjectId[];
  video: string;
  season?: mongoose.Types.ObjectId;
  series?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IEpisode>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    link: {
      type: String,
      trim: true,
      required: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    liked: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    disliked: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    video: {
      type: String,
      required: true,
    },
    season: {
      type: Schema.Types.ObjectId,
      ref: "Season",
    },
    series: { 
      type: Schema.Types.ObjectId, 
      ref: "Movie" 
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models?.Episode || mongoose.model<IEpisode>("Episode", schema);

export default model as any;