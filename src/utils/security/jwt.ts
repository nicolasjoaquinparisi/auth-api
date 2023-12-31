import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const JWT_ISSUER = process.env.JWT_ISSUER ?? "";
const EXPIRATION_TIME_IN_SECONDS = process.env.EXPIRATION_TIME_IN_SECONDS;
const AUTH_API_AUDIENCE = "auth-api";

type TPayload = {
  id: string;
  role: string;
  permissions: string[];
};

export function createAccessToken(payload: TPayload) {
  const expirationTimeInSeconds = Number(EXPIRATION_TIME_IN_SECONDS);

  const token = jwt.sign(
    {
      payload,
    },
    JWT_SECRET,
    {
      algorithm: "HS512",
      issuer: JWT_ISSUER,
      expiresIn: expirationTimeInSeconds,
      audience: AUTH_API_AUDIENCE,
    }
  );

  return { accessToken: token, expiresIn: expirationTimeInSeconds };
}

export function decodeAccessToken(accessToken: string) {
  const decodedAccessToken = jwt.verify(accessToken, JWT_SECRET);
  return decodedAccessToken;
}
