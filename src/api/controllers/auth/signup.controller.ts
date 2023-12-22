import { Request, Response, NextFunction } from "express";
import signupService from "../../services/auth/signup.service";

export default async function signup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await signupService({ data: req.body });
    return res.status(201).send({ message: "User created" });
  } catch (error) {
    next(error);
  }
}
