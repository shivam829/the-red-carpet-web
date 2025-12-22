import mongoose, { Schema, Document } from "mongoose";

export interface SiteContentDocument extends Document {
  heroTitle: string;
  heroSubtitle: string;
  eventDescription: string;
  backgroundImage: string;
  animationsEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<SiteContentDocument>(
  {
    heroTitle: String,
    heroSubtitle: String,
    eventDescription: String,
    backgroundImage: String,
    animationsEnabled: Boolean,
  },
  { timestamps: true }
);

// ✅ Vercel-safe pattern: no generics on model
export default mongoose.models.SiteContent || mongoose.model("SiteContent", SiteContentSchema);