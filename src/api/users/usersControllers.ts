import { IAuthenticatedRequest } from "../../types/interfaces";
import { Response, NextFunction } from "express";
import usersServices from "./usersServices";

async function getUserProfile(
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.userId) {
      throw new Error("User ID is missing");
    }
    const userProfile = await usersServices.getUserProfile(req.userId);

    return res.status(200).send({
      id: userProfile.id,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
    });
  } catch (error) {
    next(error);
  }
}

export default { getUserProfile };
