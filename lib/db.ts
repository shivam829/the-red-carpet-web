import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "test",        // 🔥 REQUIRED ON ATLAS
      maxPoolSize: 10,       // 🔥 STABLE ON VERCEL
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
