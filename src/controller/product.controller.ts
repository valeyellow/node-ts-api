import { Request, Response } from "express";
import {
  CreateProductInput,
  ReadProductInput,
  UpdateProductInput,
  DeleteProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";

// create product handler
export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const body = req.body;
    const userId = res.locals.user;
    const product = await createProduct({ ...body, user: userId });
    res.send(product);
  } catch (error: any) {
    res.send(500).send({ type: "error", message: error?.message });
  }
}

// update product handler
export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product?.user) !== userId) {
      return res.sendStatus(403);
    }

    const update = req.body;

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });

    res.send(updatedProduct);
  } catch (error: any) {
    res.send(500).send({ type: "error", message: error.message });
  }
}

// read product handler
export async function getProductHandler(
  req: Request<ReadProductInput["params"]>,
  res: Response
) {
  try {
    console.log("inside getProductHandler...res.locals -->", res.locals);

    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product?.user) !== userId) {
      return res.sendStatus(403);
    }

    res.send(product);
  } catch (error: any) {
    res.send(500).send({ type: "error", message: error.message });
  }
}

// delete product handler
export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      return res.sendStatus(404);
    }

    if (String(product?.user) !== userId) {
      return res.sendStatus(403);
    }

    const deletedProduct = await deleteProduct({ productId });

    res.sendStatus(200);
  } catch (error: any) {
    res.send(500).send({ type: "error", message: error.message });
  }
}
