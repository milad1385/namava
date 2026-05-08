import mongoose from "mongoose";
import UserModel from "./user";
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    orderNumber: {
      type: String,
      required: true,
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pay", "pending"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    discount: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Order || mongoose.model("Order", schema);

export default model;
