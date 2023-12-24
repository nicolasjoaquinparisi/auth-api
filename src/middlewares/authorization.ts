import { Request, Response, NextFunction } from "express";
import { decodeAccessToken } from "../utils/security/jwt";

type TDecodedAccessToken = {
  userId: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
};

export default async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let accessToken: string;

    if (
      !req.headers?.authorization ||
      !req.headers?.authorization.startsWith("Bearer")
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return;
    }

    const decodedAccessToken: TDecodedAccessToken = decodeAccessToken(
      accessToken
    ) as TDecodedAccessToken;

    req.body.userId = decodedAccessToken.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token expired" });
  }
}
