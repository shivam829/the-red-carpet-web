import mongoose, { Schema, Document, Model } from "mongoose";

export interface PassDocument extends Document {
  name: string;
  price: number;
  phase: number;
  visible: boolean;
}

const PassSchema = new Schema<PassDocument>({
  name: String,
  price: Number,
  phase: Number,
  visible: Boolean,
});

const Pass: Model<PassDocument> =
  mongoose.models.Pass ||
  mongoose.model<PassDocument>("Pass", PassSchema);

export default Pass;
