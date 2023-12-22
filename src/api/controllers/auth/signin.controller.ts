import { Request, Response, NextFunction } from "express";
import signinService from "../../services/auth/signin.service";

export default async function signin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user, accessToken } = await signinService(req.body);

    const responsePayload = {
      user: user,
      accessToken: accessToken,
    };

    res.status(200).send(responsePayload);
  } catch (error) {
    next(error);
  }
}
