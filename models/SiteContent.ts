import mongoose, { Schema, Document, Model } from "mongoose";

export interface SiteContentDocument extends Document {
  heroTitle: string;
  heroSubtitle: string;
  eventDescription: string;
  backgroundImage: string;
  animationsEnabled: boolean;
}

const SiteContentSchema = new Schema<SiteContentDocument>({
  heroTitle: String,
  heroSubtitle: String,
  eventDescription: String,
  backgroundImage: String,
  animationsEnabled: Boolean,
});

const SiteContent: Model<SiteContentDocument> =
  mongoose.models.SiteContent ||
  mongoose.model<SiteContentDocument>("SiteContent", SiteContentSchema);

export default SiteContent;
