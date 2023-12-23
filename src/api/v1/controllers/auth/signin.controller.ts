import { Request, Response, NextFunction } from "express";
import signinService from "../../services/auth/signin.service";

export default async function signin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = await signinService({ data: req.body });
    res.status(200).send(payload);
  } catch (error) {
    next(error);
  }
}
