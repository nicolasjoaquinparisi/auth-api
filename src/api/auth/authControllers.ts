import { NextFunction, Response } from "express";
import { IIdentifiedRequest } from "../../types/interfaces";
import authServices from "./authServices";

export async function signUp(
  req: IIdentifiedRequest,
  res: Response,
  next: NextFunction
) {
  let user;

  try {
    user = await authServices.signUp({
      data: req.body,
    });
  } catch (error) {
    return next(error);
  }

  return res.status(201).send({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
}

async function signIn(
  req: IIdentifiedRequest,
  res: Response,
  next: NextFunction
) {
  let response;

  try {
    response = await authServices.signIn({
      data: req.body,
    });
  } catch (error) {
    return next(error);
  }

  const { accessToken, expiresAt, user } = response;

  return res.status(200).send({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    accessToken: accessToken,
    expiresAt: expiresAt,
  });
}

export default { signIn, signUp };
