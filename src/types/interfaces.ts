import { Request } from "express";
import { Logger } from "winston";

export interface IIdentifiedRequest extends Request {
  id?: string;
  logger?: Logger;
}

export interface IAuthenticatedRequest extends IIdentifiedRequest {
  userId?: string;
}
