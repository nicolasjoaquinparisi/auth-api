import { Response, NextFunction } from "express";

import tokensServices from "../helpers/tokens";
import { TDecodedAccessToken } from "../types/types";

import { IAuthenticatedRequest } from "../types/interfaces";
import UnauthorizedError from "../errors/UnauthorizedError";
import { ERoles } from "@prisma/client";

export default function tokenAuthorization(roles: Array<ERoles>) {
  return (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    let accessToken: string;

    if (
      !req.headers?.authorization ||
      !req.headers?.authorization.startsWith("Bearer")
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return res.status(403).json({ message: "Forbidden" });
    }

    let decodedAccessToken;
    try {
      decodedAccessToken = tokensServices.decodeAccessToken(
        accessToken
      ) as TDecodedAccessToken;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      return next(error);
    }

    if (!roles.includes(decodedAccessToken.scope)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = decodedAccessToken.sub;
    next();
  };
}
