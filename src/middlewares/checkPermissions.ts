import { NextFunction, Response } from "express";
import { IAuthenticatedRequest } from "../definitions/IAuthenticatedRequest";

export default function checkPermissions(requiredPermissions: string[]) {
  return (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    const userPermissions = req.user?.permissions || [];

    const hasRequiredPermissions = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasRequiredPermissions) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
}
