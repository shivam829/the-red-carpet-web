import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPass extends Document {
  name: string;
  price: number;
  phase?: number;
  visible?: boolean;
  remainingCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PassSchema = new Schema<IPass>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    phase: { type: Number },
    visible: { type: Boolean, default: true },
    remainingCount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Pass: Model<IPass> =
  (mongoose.models.Pass as Model<IPass>) ||
  mongoose.model<IPass>("Pass", PassSchema);

export default Pass;
