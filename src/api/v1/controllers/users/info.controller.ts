import { Request, Response, NextFunction } from "express";
import infoService from "../../services/users/info.service";

export default async function signin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = await infoService({ data: { userId: req.body.userId } });
    res.status(200).send(payload);
  } catch (error) {
    next(error);
  }
}
