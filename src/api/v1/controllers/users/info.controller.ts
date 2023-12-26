import { Response, NextFunction } from "express";
import infoService from "../../services/users/info.service";
import { AuthenticatedRequest } from "../../../../definitions/AuthenticatedRequest";

export default async function signin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const payload = await infoService({ data: { userId: req.user.id } });
    res.status(200).send(payload);
  } catch (error) {
    next(error);
  }
}
