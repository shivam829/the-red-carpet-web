import mongoose, { Schema, model, models } from "mongoose";

export interface IPass {
  name: string;
  price: number;
  phase: number;
  visible: boolean;
}

const PassSchema = new Schema<IPass>(
  {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    phase: { type: Number, required: true },
    visible: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Pass =
  models.Pass || model<IPass>("Pass", PassSchema);

export default Pass;
