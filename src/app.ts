import express from "express";
import cors from "cors";
import config from "config";
import logger from "./utils/logger";
import connect from "./utils/connect";
import routes from "./routes";

const port = config.get<number>("port");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, async () => {
  logger.info(`Server is running on port:${port}`);

  routes(app);

  await connect();
});
