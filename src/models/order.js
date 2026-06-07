import mongoose from "mongoose";
import UserModel from "./user";
import SubscriptionModel from "./subscription";
const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: mongoose.Types.ObjectId,
      ref: "Subscription",
      required: true,
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
      default: "pending",
    },
    discount: {
      type: Number,
      required: true,
    },
    paid_time: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const model = mongoose.models.Order || mongoose.model("Order", schema);

export default model;
