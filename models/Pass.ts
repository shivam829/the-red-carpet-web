import mongoose, { Schema } from "mongoose";

const PassSchema = new Schema(
  {
    name: String,
    price: Number,
    phase: Number,
    visible: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.Pass ||
  mongoose.model("Pass", PassSchema);
