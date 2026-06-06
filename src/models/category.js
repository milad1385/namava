import mongoose from "mongoose";

const schema =new  mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    link: {
      type: String,
      trim: true,
      required: false,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    parrent: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.models?.Category || mongoose.model("Category", schema);

export default model;
