import { Response, NextFunction } from "express";
import { decodeAccessToken } from "../utils/security/jwt";
import { IAuthenticatedRequest } from "../definitions/IAuthenticatedRequest";
import { TDecodedAccessToken } from "../definitions/types";

export default async function authorization(
  req: IAuthenticatedRequest,
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

    req.user = decodedAccessToken.payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token expired" });
  }
}
