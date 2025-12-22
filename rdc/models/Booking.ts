import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId?: mongoose.Types.ObjectId;
  passId: mongoose.Types.ObjectId;
  passName: string;
  name: string;
  email: string;
  phone: string;
  quantity: number;
  amount: number;
  reference: string;
  qrCode?: string;
  razorpayOrderId?: string;
  paymentId?: string;
  orderId?: string;
  paidAt?: Date;
  status: "PENDING" | "PAID" | "FAILED";
  isUsed: boolean;
  usedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    passId: { type: Schema.Types.ObjectId, ref: "Pass", required: true },
    passName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true },
    reference: { type: String, required: true, unique: true },
    qrCode: String,
    razorpayOrderId: String,
    paymentId: String,
    orderId: String,
    paidAt: Date,
    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    isUsed: { type: Boolean, default: false },
    usedAt: Date,
  },
  { timestamps: true }
);

// ✅ Vercel-safe pattern: no generics on model
export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);