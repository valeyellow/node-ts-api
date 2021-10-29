import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    logger.info("DB Connected successfuly!");
  } catch (error: any) {
    logger.error("Could not connect to DB");
    process.exit(1);
  }
}

export default connect;
