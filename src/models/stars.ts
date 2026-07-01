import mongoose, { Schema } from "mongoose";

export interface IStars {
  name: string;
  bio: string;
  link: string;
  twitter?: string;
  instagram?: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IStars>(
  {
    name: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    twitter: { type: String, required: false, trim: true },
    instagram: { type: String, required: false, trim: true },
    image: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const model = mongoose.models?.Stars || mongoose.model<IStars>("Stars", schema);

export default model as any;
