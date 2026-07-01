import mongoose, { Schema } from "mongoose";
import UserModel from "./user";
import movieModel from "./movie";

export interface IProfile {
  name: string;
  user: mongoose.Types.ObjectId;
  ages?: 3 | 7 | 12 | 15 | 18;
  isLock?: boolean;
  password?: string;
  timeLimits?: {
    start?: string;
    end?: string;
  };
  limitsMovies?: mongoose.Types.ObjectId[];
  image?: string;
  type?: "adult" | "kid";
  createdAt?: Date;
  updatedAt?: Date;
}

export const schema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ages: {
      type: Number,
      required: true,
      enum: [3, 7, 12, 15, 18],
      default: 3,
    },
    isLock: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: false,
      trim: true,
    },
    timeLimits: {
      start: {
        type: String,
        required: false,
      },
      end: {
        type: String,
        required: false,
      },
    },
    limitsMovies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        default: [],
      },
    ],
    image: {
      type: String,
      default: "/uploads/user.png",
    },
    type: {
      type: String,
      default: "adult",
      enum: ["adult", "kid"],
    },
  },
  {
    timestamps: true,
  },
);

const model =
  mongoose.models.Profile || mongoose.model<IProfile>("Profile", schema);

export default model;
