import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: "SUPER" | "STAFF";
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPER", "STAFF"],
      default: "STAFF",
    },
  },
  { timestamps: true }
);

const Admin: Model<IAdmin> =
  mongoose.models.Admin as Model<IAdmin> ||
  mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
