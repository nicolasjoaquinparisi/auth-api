import jwt from "jsonwebtoken";
import { env } from "../config/env";
import UnauthorizedError from "../errors/UnauthorizedError";
import { TDecodedAccessToken } from "../types/types";
import { ERoles } from "@prisma/client";

const {
  ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS,
  TOKEN_ISSUER,
  ACCESS_TOKEN_SECRET,
} = env;

function createToken(
  sub: string,
  scope: ERoles,
  secret: string,
  expiresIn: number
) {
  return jwt.sign(
    {
      scope: scope,
    },
    secret,
    {
      algorithm: "HS256",
      subject: sub,
      issuer: TOKEN_ISSUER,
      expiresIn: expiresIn,
    }
  );
}

function generateTokens(sub: string, scope: ERoles) {
  const accessToken = createToken(
    sub,
    scope,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS
  );

  return {
    accessToken: accessToken,
    expiresAt: ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS,
  };
}

function decodeAccessToken(accessToken: string): TDecodedAccessToken {
  try {
    const decoded = jwt.verify(
      accessToken,
      ACCESS_TOKEN_SECRET
    ) as TDecodedAccessToken;
    return decoded;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("Token has expired");
    }
    throw new UnauthorizedError("Invalid token");
  }
}

export default {
  generateTokens,
  decodeAccessToken,
};
