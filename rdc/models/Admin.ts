import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: "SUPER" | "STAFF";
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPER", "STAFF"],
      default: "STAFF",
    },
  },
  { timestamps: true }
);

// ✅ Vercel-safe pattern: no generics on model
export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);