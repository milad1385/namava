import mongoose from "mongoose";
import usersModel from "./user";
import departmentsModel from "./department";
import SubDepartment from "./subdepartment";
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: mongoose.Types.ObjectId,
      ref: "SubDepartment",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFromUserPanel: {
      type: Boolean,
      default: true,
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
    replyTo: {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
    },
    isOpen: {
      type: Boolean,
      required: false,
    },
    status: {
      type: String,
      enum: ["answered", "pending"],
      required: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default model;
