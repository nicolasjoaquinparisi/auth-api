import Joi from "joi";

export const signupSchema = Joi.object({
  firstName: Joi.string().required().empty(),
  lastName: Joi.string().required().empty(),
  email: Joi.string().email().required().empty(),
  password: Joi.string().required().empty(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().empty(),
  password: Joi.string().required().empty(),
});
