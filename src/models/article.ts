import mongoose, { Schema, models, Model } from "mongoose";

export interface IArticle {
  title: string;
  link: string;
  readingTime: string;
  tags: string[];
  movie?: mongoose.Types.ObjectId;
  image: string;
  content: string;
  creator?: mongoose.Types.ObjectId;
  isAccept?: boolean;
  isDraft?: boolean;
  shortDesc?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IArticle>(
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
    readingTime: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    movie: {
      type: Schema.Types.ObjectId, 
      ref: "Movie",
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isAccept: {
      type: Boolean,
      default: false,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    shortDesc: {
      type: String,
      default: "",  
    },
  },
  { timestamps: true }
);

// 📌 تعریف مدل با تایپ صحیح
const ArticleModel: Model<IArticle> = models.Article || mongoose.model<IArticle>("Article", schema);

export default ArticleModel;