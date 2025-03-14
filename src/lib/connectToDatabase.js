import mongoose from "mongoose";
const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;
console.log("MongoDB URI:", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("Mongo URI Not Found. Ensure it is set in .env");
  // console.log("error");
  
}

// Use a global variable to store the connection across hot reloads
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    console.log("✅ Using existing database connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");
    cached.promise = await mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✅ MongoDB connected");
      return mongoose;
    }).catch((err) => {
      console.error("❌ MongoDB connection error:", err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
