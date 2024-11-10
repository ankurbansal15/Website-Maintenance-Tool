// import mongoose, { Document, Model, Schema } from "mongoose";

// interface IWebsite extends Document {
//   url: string;
//   userId: mongoose.Types.ObjectId;
//   isActive: boolean;
// }

// const WebsiteSchema: Schema<IWebsite> = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     url: {
//       type: String,
//       required: true,
//     },

//     isActive: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true, // Automatically adds createdAt and updatedAt fields
//   }
// );

// const Website: Model<IWebsite> =
//   mongoose.models.Website || mongoose.model<IWebsite>("Website", WebsiteSchema);

// export default Website;
