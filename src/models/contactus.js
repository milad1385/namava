import mongoose from "mongoose";
import DepartmentModel from "@/src/models/department";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Contact || mongoose.model("Contact", schema);

export default model;
