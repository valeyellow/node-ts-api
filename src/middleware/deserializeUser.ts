// extract the user-id from the token and set it to the res.locals.user

import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (accessToken) {
    const { decoded } = verifyJwt(accessToken);
    if (decoded) {
      res.locals.user = decoded;
    }
  }

  next();
};

export default deserializeUser;
