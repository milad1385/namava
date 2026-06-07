import mongoose from "mongoose";
import UserModel from "./user";
import SubscriptionModel from "./subscription";
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
      enum: ["pay", "pending", "cancel"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    subscription: {
      type: mongoose.Types.ObjectId,
      ref: "Subscription",
      required: true,
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
  },
);

const model = mongoose.models.Order || mongoose.model("Order", schema);

export default model;
