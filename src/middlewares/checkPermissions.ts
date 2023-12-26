import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../definitions/AuthenticatedRequest";

export default function checkPermissions(requiredPermissions: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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
