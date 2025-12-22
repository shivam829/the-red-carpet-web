import mongoose, { Schema, Document } from "mongoose";

export interface IPass extends Document {
  name: string;
  price: number;
  phase?: number;
  visible?: boolean;
  remainingCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const PassSchema = new Schema<IPass>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    phase: { type: Number },
    visible: { type: Boolean, default: true },
    remainingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ✅ Vercel-safe pattern: no generics on model
export default mongoose.models.Pass || mongoose.model("Pass", PassSchema);