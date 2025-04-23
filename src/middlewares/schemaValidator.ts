import { Response, NextFunction } from "express";
import { IAuthenticatedRequest } from "../types/interfaces";
import { ZodError, ZodObject } from "zod";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";

type TSchemaValidatorParams = {
  bodySchema?: ZodObject<any>;
  paramsSchema?: ZodObject<any>;
};

export default function schemaValidator({
  bodySchema,
  paramsSchema,
}: TSchemaValidatorParams) {
  return (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    req.logger?.info("Executing schema validation");

    if (paramsSchema) {
      req.logger?.info("Validating request params");

      try {
        req.params = paramsSchema.parse(req.params);
      } catch (error) {
        if (error instanceof ZodError) {
          const validationIssues = error.issues?.map(
            (issue) => `${issue.path.join(".")}: ${issue.message}`
          );
          return next(
            new UnprocessableEntityError(
              `Failed to validate schema: ${validationIssues}`
            )
          );
        }

        return next(new Error("Unknown error"));
      }
    }

    if (bodySchema) {
      req.logger?.info("Validating request body");

      try {
        req.body = bodySchema.parse(req.body);
      } catch (error) {
        if (error instanceof ZodError) {
          const validationIssues = error.issues?.map(
            (issue) => `${issue.path.join(".")}: ${issue.message}`
          );
          return next(
            new UnprocessableEntityError(
              `Failed to validate schema: ${validationIssues}`
            )
          );
        }

        return next(new Error("Unknown error"));
      }
    }

    next();
  };
}
