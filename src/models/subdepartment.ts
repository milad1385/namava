import mongoose, { Schema } from "mongoose";
import Department from "./department";

export interface ISubDepartment {
  title: string;
  department?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ISubDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  { timestamps: true },
);

const model =
  mongoose.models.SubDepartment ||
  mongoose.model<ISubDepartment>("SubDepartment", schema);

export default model;
