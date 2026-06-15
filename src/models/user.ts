import mongoose, { Schema } from "mongoose";
import CategoryModel from "./category";
import ProfileModel from "./profile";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role?: "USER" | "ADMIN";
  birthday?: string;
  province?: string;
  favGenre?: mongoose.Types.ObjectId;
  biography?: string;
  profiles?: mongoose.Types.ObjectId[];
  profileLimitCount?: number;
  subscriptionEnd?: Date | null;
  subscriptionStart?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN"],
      default: "USER",
      trim: true,
    },
    birthday: {
      type: String,
      trim: true,
    },
    province: {
      type: String,
      trim: true,
    },
    favGenre: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    biography: {
      type: String,
      required: false,
      trim: true,
    },
    profiles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: false,
      },
    ],
    profileLimitCount: {
      type: Number,
      default: 4,
    },
    subscriptionEnd: {
      type: Date,
      default: null,
    },
    subscriptionStart: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const model = mongoose.models?.User || mongoose.model<IUser>("User", schema);

export default model;
