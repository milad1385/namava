import mongoose, { Schema } from "mongoose";

export interface IMenu {
  title: string;
  link: string;
  parrent?: mongoose.Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IMenu>(
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
      type: Schema.Types.ObjectId,
      ref: "Menu",
      default: null,
    },
  },
  { timestamps: true }
);

const model = mongoose.models?.Menu || mongoose.model<IMenu>("Menu", schema);

export default model as any;