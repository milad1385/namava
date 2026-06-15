import mongoose, { Schema, models, Model } from "mongoose";
import MovieModel from "./movie";
import UserModel from "./user";
export interface IBookmark {
  user?: mongoose.Types.ObjectId;
  movie?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IBookmark>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  },
  { timestamps: true },
);

const BookmarkModel: Model<IBookmark> =
  models.Bookmark || mongoose.model<IBookmark>("Bookmark", schema);

export default BookmarkModel as any;
