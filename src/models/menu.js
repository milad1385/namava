import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    parrent: {
      type: mongoose.Types.ObjectId,
      ref: "Menu",
      required: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.models?.Menu || mongoose.model("Menu", schema);

export default model;
