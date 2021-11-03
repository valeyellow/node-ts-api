import jwt from "jsonwebtoken";
import config from "config";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

export function signJwt(
  payload: object,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      isValid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      isValid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
