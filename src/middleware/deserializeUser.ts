import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

// extract the user object from the token and set it to the res.locals.user
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (accessToken) {
    const { decoded, expired } = verifyJwt(accessToken);
    if (decoded) {
      res.locals.user = decoded;
    }

    if (expired && refreshToken) {
      const newAccessToken = await reIssueAccessToken({ refreshToken });

      if (newAccessToken) {
        res.setHeader("x-access-token", newAccessToken);
      }

      const { decoded } = verifyJwt(newAccessToken as string);

      res.locals.user = decoded;
    }
  }

  next();
};

export default deserializeUser;

// re-issuing access token if a valid refresh token exists

// while deserializing the user, we check if the accessToken is expired and valid refreshToken is available, if yes, then...
// we pass the refreshToken to a function that re-issues the accessToken

//  ------------------------------------------------------------------------- //
// reIssueAccessToken() func...
// takes in the refresh token and deserializes it by calling verifyJwt on it
// we then check if the value returned is valid and extract the sessionId from the decoded object
// we check if the session is valid
// if true, we find the user from the session object (session object contains the userId of the user creating the session)
// we use signJwt() to create a new accessToken and return it

// inside the deserializeUser, we check if the returned accessToken is a truthy value, if yes, then we set the x-refresh-token header to the newAccessToken
// we then verify and decode the new access token, and set the res.locals.user property to decoded.user
