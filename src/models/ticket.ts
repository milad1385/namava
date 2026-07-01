import mongoose, { Schema } from "mongoose";
import usersModel from "./user";
import departmentsModel from "./department";
import SubDepartment from "./subdepartment";

export interface ITicket {
  title: string;
  body: string;
  priority?: 1 | 2 | 3;
  department: mongoose.Types.ObjectId;
  subDepartment?: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  isFromUserPanel?: boolean;
  isAnswer?: boolean;
  replyTo?: mongoose.Types.ObjectId;
  isOpen?: boolean;
  status?: "answered" | "pending";
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ITicket>(
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
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: Schema.Types.ObjectId,
      ref: "SubDepartment",
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
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
  { timestamps: true },
);

const model =
  mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", schema);

export default model;
