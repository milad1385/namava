import mongoose, { Schema, models, Model } from "mongoose";

export interface IActor {
  name: string;
  biography: string;
  link: string;
  twitter?: string;
  instagram?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IActor>(
  {
    name: { type: String, required: true, trim: true },
    biography: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    twitter: { type: String, trim: true },
    instagram: { type: String, trim: true },
    image: {
      type: String,
      trim: true,
      default: "/uploads/star-placeholder.png",
    },
  },
  { timestamps: true },
);

const ActorModel: Model<IActor> =
  models.Actor || mongoose.model<IActor>("Actor", schema);

export default ActorModel as any;
