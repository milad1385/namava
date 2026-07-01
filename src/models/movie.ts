import mongoose, { Schema } from "mongoose";
import CategoryModel from "./category";
import UserModel from "./user";
import StarModel from "./stars";
import Season from "./Season";

export interface IMovie {
  title: string;
  ageRange: string;
  time?: string;
  link: string;
  type?: "film" | "series";
  shortDesc: string;
  showTime: string;
  category: mongoose.Types.ObjectId;
  season?: string | null;
  longDesc: string;
  language: string;
  mainImage: string;
  video?: string;
  deskBanner: string;
  mobileBanner: string;
  detailImage: string[];
  creator: mongoose.Types.ObjectId;
  priceStatus?: "price" | "free";
  logo: string;
  director: string;
  IMDB?: number;
  contentType?: "kid" | "adult";
  actors?: mongoose.Types.ObjectId[];
  isSlider?: boolean;
  seasons?: mongoose.Types.ObjectId[];
  liked?: mongoose.Types.ObjectId[];
  disliked?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  comments?: any[];
}

const schema = new Schema<IMovie>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    ageRange: {
      type: String,
      trim: true,
      required: true,
    },
    time: {
      type: String,
      trim: true,
      required: false,
    },
    link: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      trim: true,
      enum: ["film", "series"],
      default: "film",
    },
    shortDesc: {
      type: String,
      trim: true,
      required: true,
    },
    showTime: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    season: {
      type: String,
      trim: true,
      required: false,
      default: null,
    },
    longDesc: {
      type: String,
      trim: true,
      required: true,
    },
    language: {
      type: String,
      trim: true,
      required: true,
    },
    mainImage: {
      type: String,
      trim: true,
      required: true,
    },
    video: {
      type: String,
      trim: true,
      required: false,
    },
    deskBanner: {
      type: String,
      trim: true,
      required: true,
    },
    mobileBanner: {
      type: String,
      trim: true,
      required: true,
    },
    detailImage: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priceStatus: {
      type: String,
      default: "price",
      enum: ["price", "free"],
    },
    logo: {
      type: String,
      trim: true,
      required: true,
    },
    director: {
      type: String,
      trim: true,
      required: true,
    },
    IMDB: {
      type: Number,
      default: 5,
    },
    contentType: {
      type: String,
      enum: ["kid", "adult"],
      default: "adult",
    },
    actors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Stars",
      },
    ],
    isSlider: {
      type: Boolean,
      default: false,
    },
    seasons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Season",
      },
    ],
    liked: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    disliked: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true },
);

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "movie",
});

const model = mongoose.models?.Movie || mongoose.model<IMovie>("Movie", schema);

export default model as any;
