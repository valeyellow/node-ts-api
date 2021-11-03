import { FilterQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";

export const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  const sessions = await SessionModel.find(query).lean();
  return sessions;
};
