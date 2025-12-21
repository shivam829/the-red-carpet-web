import mongoose, { Schema } from "mongoose";

const PassSchema = new Schema(
  {
    name: String,
    price: Number,
    phase: Number,
    visible: Boolean,

    // ✅ NEW
    remainingCount: {
      type: Number,
      required: true,
      default: 590,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Pass ||
  mongoose.model("Pass", PassSchema);
