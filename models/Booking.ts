import mongoose, { Schema, Document, Model } from "mongoose";

export interface BookingDocument extends Document {
  name: string;
  phone: string;
  email: string;
  passName: string;
  phase: number;
  price: number;

  paymentId?: string;
  orderId?: string;
  qrCode?: string;

  status: "PENDING" | "PAID" | "FAILED";
  checkedIn: boolean;
}

const BookingSchema = new Schema<BookingDocument>(
  {
    name: String,
    phone: String,
    email: String,

    passName: String,
    phase: Number,
    price: Number,

    paymentId: String,
    orderId: String,
    qrCode: String,

    status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    checkedIn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Booking: Model<BookingDocument> =
  mongoose.models.Booking ||
  mongoose.model<BookingDocument>("Booking", BookingSchema);

export default Booking;
