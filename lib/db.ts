// lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not defined");
}

// ✅ DO NOT use global cache with mongoose v9
export default async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  return mongoose.connect(MONGODB_URI, {
    dbName: "test", // 🔴 IMPORTANT
  });
}
