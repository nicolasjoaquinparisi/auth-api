// middleware/requestValidations.ts
import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

export default function validate(validationSchema: ObjectSchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await validationSchema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}
