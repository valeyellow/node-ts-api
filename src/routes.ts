import { Express, Request, Response } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  createSessionHandler,
  getSessionsHandler,
  deleteSessionHandler,
  deleteSessionsHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import verifyResources from "./middleware/verifyResources";
import {
  createProductSchema,
  deleteProductSchema,
  readProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import createSessionSchema from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.send("Connection is successful!");
  });

  app.post("/api/users", verifyResources(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    verifyResources(createSessionSchema),
    createSessionHandler
  );

  app.get("/api/sessions", requireUser, getSessionsHandler);

  //logout
  app.delete("/api/session", requireUser, deleteSessionHandler);

  // logout from all sessions
  app.delete("/api/sessions", requireUser, deleteSessionsHandler);

  // add a new product
  app.post(
    "/api/products",
    [requireUser, verifyResources(createProductSchema)],
    createProductHandler
  );

  // update an existing product
  app.put(
    "/api/products/:productId",
    [requireUser, verifyResources(updateProductSchema)],
    updateProductHandler
  );

  // read a product
  app.get(
    "/api/products/:productId",
    verifyResources(readProductSchema),
    getProductHandler
  );

  // delete a product
  app.delete(
    "/api/products/:productId",
    [requireUser, verifyResources(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes;
