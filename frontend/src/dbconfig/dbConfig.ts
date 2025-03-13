import mongoose from "mongoose";

export async function connect() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return mongoose.connection;
    }
    
    await mongoose.connect(process.env.MONGODB_URI!);
    if (mongoose.connection.db) {
      console.log("MongoDB connected successfully to:", mongoose.connection.db.databaseName);
    } else {
      console.log("MongoDB connected successfully");
    }
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
}
