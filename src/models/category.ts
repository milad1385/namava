import mongoose, { Schema, models, Model } from "mongoose";

export interface ICategory {
  title: string;
  link?: string;
  description: string;
  tags: string[];
  parrent?: Schema.Types.ObjectId | null;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ICategory>(
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
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const CategoryModel: Model<ICategory> =
  models.Category || mongoose.model<ICategory>("Category", schema);

export default CategoryModel as any;
