import mongoose, { Schema } from "mongoose";
import MovieModel from "./movie";
import EpisodeModel from "./episode";

export interface ISeason {
  seasonNumber?: number;
  episodes?: mongoose.Types.ObjectId[];
  series?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ISeason>(
  {
    seasonNumber: {
      type: Number,
    },
    episodes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Episode",
        default: [],
      },
    ],
    series: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models?.Season || mongoose.model<ISeason>("Season", schema);

export default model;