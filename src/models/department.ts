import mongoose from "mongoose";
const schema =new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model =
  mongoose.models.Department || mongoose.model("Department", schema);

export default model;
