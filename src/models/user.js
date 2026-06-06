import mongoose from "mongoose";
import CategoryModel from "./category";
import ProfileModel from "./profile";
const schema = new mongoose.Schema(
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
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    biography: {
      type: String,
      required: false,
      trim: true,
    },

    profiles: [
      { type: mongoose.Types.ObjectId, ref: "Profile", required: false },
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
  { timestamps: true }
);

const model = mongoose.models?.User || mongoose.model("User", schema);

export default model;
