import { Response, NextFunction } from "express";
import { IIdentifiedRequest } from "../types/interfaces";
import logger from "../helpers/logger";
import HTTPResponseError from "../errors/HTTPResponseError";

export default function errorHandler(
  err: Error,
  req: IIdentifiedRequest,
  res: Response,
  next: NextFunction
) {
  if (req?.logger) {
    req?.logger.error(err);
  } else {
    logger.error(err);
  }

  if (err instanceof HTTPResponseError) {
    return res.status(err.status).send({ message: err.message });
  }

  res.status(503).send({ message: "Service unavailable" });
}
