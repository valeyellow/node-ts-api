import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import verifyResources from "./middleware/verifyResources";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.send("Connection is successful!");
  });

  app.post("/api/users", verifyResources(createUserSchema), createUserHandler);
}

export default routes;
