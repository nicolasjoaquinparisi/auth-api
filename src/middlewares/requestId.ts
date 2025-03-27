import { Request, Response, NextFunction } from "express";
import { IIdentifiedRequest } from "../types/interfaces";

export default function requestId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestId = crypto.randomUUID();
  (req as IIdentifiedRequest).id = requestId;
  next();
}
