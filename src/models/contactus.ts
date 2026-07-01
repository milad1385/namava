import mongoose, { Schema } from "mongoose";
import DepartmentModel from "@/src/models/department";

export interface IContact {
  name: string;
  phone: string;
  department?: mongoose.Types.ObjectId;
  email: string;
  message: string;
  isAnswer?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isAnswer: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const model =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", schema);

export default model as any;
