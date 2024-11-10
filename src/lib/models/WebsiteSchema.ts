import mongoose, { Document, Schema } from 'mongoose';

interface IWebsite extends Document {
  url: string;
  username: string;
  isActive: boolean;
}

const WebsiteSchema: Schema<IWebsite> = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Website = mongoose.model<IWebsite>('Website', WebsiteSchema);

export default Website;
