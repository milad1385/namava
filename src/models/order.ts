import mongoose, { Schema } from "mongoose";
import UserModel from "./user";
import SubscriptionModel from "./subscription";

export interface IOrder {
  user: mongoose.Types.ObjectId;
  subscription: mongoose.Types.ObjectId;
  orderNumber: string;
  totalPrice: number;
  status?: "pay" | "pending" | "cancel";
  discount: number;
  paid_time?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: Schema.Types.ObjectId,
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
  }
);

const model = mongoose.models.Order || mongoose.model<IOrder>("Order", schema);

export default model as any;