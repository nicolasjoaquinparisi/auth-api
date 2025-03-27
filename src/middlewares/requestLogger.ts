import { Request, Response, NextFunction } from "express";
import logger from "../helpers/logger";
import { IIdentifiedRequest } from "../types/interfaces";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const typedReq = req as IIdentifiedRequest;
  typedReq.logger = logger.child({ requestId: typedReq.id });

  typedReq.logger.info({
    message: "Incoming request",
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
  });

  res.on("finish", () => {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      typedReq.logger?.info(`Completed with status ${res.statusCode}`);
    } else {
      typedReq.logger?.error(`Completed with status ${res.statusCode}`);
    }
  });
  next();
};

export default requestLogger;
