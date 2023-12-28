import { Response, NextFunction } from "express";
import infoService from "../../services/users/info.service";
import { IAuthenticatedRequest } from "../../../../definitions/IAuthenticatedRequest";

export default async function signin(
  req: IAuthenticatedRequest,
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
