import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const connectToDB = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to MongoDB");
      cached.conn = mongoose.connection;
      return cached.conn;
    }

    if (mongoose.connection.readyState === 2) {
      console.log("⏳ Connection is in progress...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mongoose.connection;
    }

    console.log("🔄 Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL!, {
      authSource: "admin",
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      family: 4,
    });

    cached.conn = conn;
    console.log("✅ Connected to db successfully :)");
    return conn;
  } catch (err) {
    console.error("❌ Connection failed:", err);
    cached.conn = null;
    throw err;
  }
};

export default connectToDB;
