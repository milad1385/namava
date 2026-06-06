import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    biography: {
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
      trim: true,
    },
    inastagram: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: "http://localhost:3000/uploads/star-placeholder.png",
    },
  },
  { timestamps: true }
);

const model = mongoose.models?.Actor || mongoose.model("Actor", schema);

export default model;
