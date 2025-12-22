import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPass extends Document {
  name: string;
  price: number;
  phase?: number;
  visible?: boolean;
  remainingCount?: number; // ✅ OPTIONAL
}

const PassSchema = new Schema<IPass>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    phase: Number,
    visible: { type: Boolean, default: true },
    remainingCount: { type: Number, default: 0 }, // ✅ SAFE DEFAULT
  },
  { timestamps: true }
);

const Pass =
  mongoose.models.Pass ||
  mongoose.model<IPass>("Pass", PassSchema);

export default Pass;
