import mongoose, { Mongoose, MongooseDocument } from "mongoose";
import { UserDocument } from "./user.model";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ProductDocument extends MongooseDocument {
  user: UserDocument["_id"];
  productId: String;
  title: String;
  description: String;
  price: Number;
  image: String;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
