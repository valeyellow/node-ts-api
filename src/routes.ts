import { Express, Request, Response } from "express";

function routes(app: Express) {
  app.get("/healthCheck", (req: Request, res: Response) => {
    res.send("Connection is successful!");
  });
}

export default routes;
