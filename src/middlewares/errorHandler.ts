import { Request, Response, NextFunction, Errback } from "express";
import EmailConflictError from "../errors/auth/EmailConflictError";
import WeakPasswordError from "../errors/auth/WeakPasswordError";

export default async function errorHandler(
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof EmailConflictError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err instanceof WeakPasswordError) {
    return res.status(err.status).json({ message: err.message });
  }

  res.status(500).send({ message: "internal server error" });
}
