import { Request, Response } from "express";
import {
  createSession,
  findSessions,
  updateSessions,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";

const accessTokenTtl = config.get<string>("accessTokenTtl");
const refreshTokenTtl = config.get<string>("refreshTokenTtl");

export async function createSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(400).send({ message: "Invalid Credentials" });
  }

  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = signJwt(
    {
      ...user,
      sessionId: session._id,
    },
    {
      expiresIn: accessTokenTtl,
    }
  );

  const refreshToken = signJwt(
    { ...user, sessionId: session._id },
    { expiresIn: refreshTokenTtl }
  );

  return res.send({ accessToken, refreshToken });

  // find the user using email and verify the password
  // create a new session for the user
  // create access and refresh tokens
  // send the access and refresh tokens
}

export async function getSessionsHandler(req: Request, res: Response) {
  const sessions = await findSessions({ user: res.locals.user, valid: true });
  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.sessionId;

  await updateSessions({ _id: sessionId }, { valid: false });

  res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export async function deleteSessionsHandler(req: Request, res: Response) {
  const user = res.locals.user._id;

  await updateSessions({ user }, { valid: false });

  res.send({
    accessToken: null,
    refreshToken: null,
  });
}
