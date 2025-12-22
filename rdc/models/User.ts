import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name?: string;
  phone: string;
  email?: string;
  password: string;
  bookings: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    phone: { type: String, required: true, unique: true },
    email: String,
    password: String,
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true }
);

// ✅ Vercel-safe pattern: no generics on model
export default mongoose.models.User || mongoose.model("User", UserSchema);