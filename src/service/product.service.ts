import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, { ProductDocument } from "../models/product.model";

// create a product
export async function createProduct(
  input: Omit<ProductDocument, "createdAt" | "updatedAt">
) {
  try {
    return await ProductModel.create(input);
  } catch (error: any) {
    throw error;
  }
}

// update a product
export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

// delete a product
export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}

export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    return await ProductModel.findOne(query, {}, options);
  } catch (error: any) {
    throw new Error(error);
  }
}
