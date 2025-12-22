import mongoose, { Schema, Document, Model } from "mongoose";

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
    phase: Number,
    visible: { type: Boolean, default: true },

    // ✅ IMPORTANT: NOT required
    remainingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (mongoose.models.Pass as Model<IPass>) ||
  mongoose.model<IPass>("Pass", PassSchema);
