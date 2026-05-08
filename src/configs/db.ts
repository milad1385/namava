import mongoose from "mongoose";
const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    }
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL, {
      authSource: "admin",
    });
    console.log("Connected to db successFully :)");
  } catch (err) {
    console.log(err);
    console.log("Connected to db is faild please try again !!!");
  }
};

export default connectToDB;
