import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    pass: { type: Schema.Types.ObjectId, ref: "Pass" },
    name: String,
    email: String,
    phone: String,
    quantity: Number,
    amount: Number,
    reference: String,
    qrData: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    checkedIn: { type: Boolean, default: false },
    checkedInAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
