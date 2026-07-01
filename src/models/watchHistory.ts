import mongoose, { Schema, Model, Types } from "mongoose";
import { IMovie } from "./movie";
import { IUser } from "./user";
import { IEpisode } from "./episode";
import MovieModel from "./movie";
import UserModel from "./user";
import EpisodeModel from "./episode";
import CategoryModel from "./category";

export interface IWatchHistoryPopulated {
  user: IUser;
  movie: IMovie;
  episode: IEpisode | null;
  currentTime: number;
  duration: number;
  progress: number;
  lastWatched: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWatchHistory extends mongoose.Document {
  user: Types.ObjectId;
  movie: Types.ObjectId;
  episode: Types.ObjectId | null;
  currentTime: number;
  duration: number;
  progress: number;
  lastWatched: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const watchHistorySchema = new Schema<IWatchHistory>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    episode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
      default: null,
    },
    currentTime: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    progress: { type: Number, default: 0 },
    lastWatched: { type: Date, default: Date.now },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

watchHistorySchema.index({ user: 1, movie: 1, episode: 1 }, { unique: true });
watchHistorySchema.index({ user: 1, lastWatched: -1 });

const WatchHistoryModel: Model<IWatchHistory> =
  mongoose.models.WatchHistory ||
  mongoose.model<IWatchHistory>("WatchHistory", watchHistorySchema);

export default WatchHistoryModel as any;
