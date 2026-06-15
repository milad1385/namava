import mongoose, { Schema } from "mongoose";
import UserModel from "./user";

export interface ISubscription {
  title: string;
  price: number;
  discount?: number;
  time: number;
  creator: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ISubscription>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    time: {
      type: Number,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Subscription || mongoose.model<ISubscription>("Subscription", schema);

export default model;