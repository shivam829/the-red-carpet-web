import mongoose from "mongoose";

const PassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    phase: Number,
    visible: { type: Boolean, default: true },
    remainingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Pass ??
  mongoose.model("Pass", PassSchema);
