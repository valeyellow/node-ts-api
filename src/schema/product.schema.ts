import { string, number, object, TypeOf } from "zod";

export const payload = {
  body: object({
    title: string({ required_error: "Title is required" }),
    image: string({ required_error: "Image is required" }),
    description: string({ required_error: "Description is required" }).min(
      120,
      "Description should be minimum 120 characters long"
    ),
    price: number({ required_error: "Price is required" }),
  }),
};

// params
export const params = {
  params: object({
    productId: string({
      required_error: "Product ID is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const readProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type ReadProductInput = TypeOf<typeof readProductSchema>;
