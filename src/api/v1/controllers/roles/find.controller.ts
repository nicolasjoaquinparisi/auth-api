import { Request, Response, NextFunction } from "express";
import findService from "../../services/roles/find.service";

export default async function signin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = await findService();
    res.status(200).send(payload);
  } catch (error) {
    next(error);
  }
}
