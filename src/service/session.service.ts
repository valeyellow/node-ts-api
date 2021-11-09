import { FilterQuery, UpdateQuery } from "mongoose";
import { get } from "lodash";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import config from "config";

const accessTokenTtl = config.get<string>("accessTokenTtl");

export const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  const sessions = await SessionModel.find(query).lean();
  return sessions;
};

export const updateSessions = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  await SessionModel.updateMany(query, update);
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "sessionId")) return false;

  const session = await SessionModel.findById({
    _id: get(decoded, "sessionId"),
  });

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const newAccessToken = signJwt(
    {
      ...user,
      sessionId: session._id,
    },
    {
      expiresIn: accessTokenTtl,
    }
  );

  return newAccessToken;
};
