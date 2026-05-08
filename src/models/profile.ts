import mongoose from "mongoose";
import UserModel from "./user";
import movieModel from "./movie";
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ages: {
    type: Number,
    required: true,
    enum: [3, 7, 12, 15, 18],
    defalut: 3,
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
      type: mongoose.Types.ObjectId,
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
});

const model = mongoose.models.Profile || mongoose.model("Profile", schema);

export default model;
