import mongoose from "mongoose";

const schema = new mongoose.Schema(
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
    readingTime: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    movie: {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },

    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    isAccept: {
      type: Boolean,
      default: false,
    },

    isDraft: {
      type: Boolean,
      default: false,
    },

    shortDesc: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Article || mongoose.model("Article", schema);

export default model;
