import { ERoles } from "@prisma/client";
import z from "zod";

const ROLE_SCHEMA = z.nativeEnum(ERoles).default(ERoles.USER).optional();

const USER_EMAIL = z.string().email().max(255);
const USER_PASSWORD = z.string().min(6).max(255);
const USER_FIRST_NAME = z.string().max(255);
const USER_LAST_NAME = z.string().max(255);

export const USER_SIGNIN_SCHEMA = z.object({
  email: USER_EMAIL,
  password: USER_PASSWORD,
});

export const USER_SIGNUP_SCHEMA = z.object({
  email: USER_EMAIL,
  firstName: USER_FIRST_NAME,
  lastName: USER_LAST_NAME,
  password: USER_PASSWORD,
  role: ROLE_SCHEMA,
});
