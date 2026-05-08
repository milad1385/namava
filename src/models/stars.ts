import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    twitter: {
      type: String,
      required: false,
      trim: true,
    },

    instagram: {
      type: String,
      required: false,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models?.Stars || mongoose.model("Stars", schema);

export default model;
