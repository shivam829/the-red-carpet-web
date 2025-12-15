import mongoose, { Schema, Document, Model } from "mongoose";

export interface AdminDocument extends Document {
  email: string;
  password: string;
  role: "SUPER" | "STAFF";
}

const AdminSchema = new Schema<AdminDocument>({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "STAFF" },
});

const Admin: Model<AdminDocument> =
  mongoose.models.Admin ||
  mongoose.model<AdminDocument>("Admin", AdminSchema);

export default Admin;
