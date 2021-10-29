import { DocumentDefinition } from "mongoose";
import { userInfo } from "os";
import UserModel, { UserDocument } from "../models/user.model";
import logger from "../utils/logger";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    const user = await UserModel.create(input);
    return user;
  } catch (e) {
    logger.error(e);
  }
}
