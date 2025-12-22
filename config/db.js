import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("DB_URL:", process.env.DATABASE_URL);
    const conn = await mongoose.connect(process.env.DATABASE_URL);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
