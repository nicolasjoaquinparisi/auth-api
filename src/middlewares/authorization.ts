import { Request, Response, NextFunction } from "express";
import { decodeAccessToken } from "../utils/security/jwt";

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

    const decodedAccessToken: TAccessToken = decodeAccessToken(accessToken);

    const user = decodedAccessToken.user;

    if (decodedAccessToken.exp) {
      return res.status(400).json({ message: "Access token malformed" });
    }

    const expirationTime = new Date(decodedAccessToken.exp * 1000);
    const currentDate = new Date();

    if (expirationTime < currentDate) {
      return res.status(400).json({ message: "Token expired" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
