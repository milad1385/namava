import mongoose, { Schema } from "mongoose";

export interface IDepartment {
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Department || mongoose.model<IDepartment>("Department", schema);

export default model as any;