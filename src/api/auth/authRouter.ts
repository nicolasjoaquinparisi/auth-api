import { Router } from "express";
import authControllers from "./authControllers";
import schemaValidator from "../../middlewares/schemaValidator";
import { USER_SIGNUP_SCHEMA, USER_SIGNIN_SCHEMA } from "./authSchemas";

const router = Router();

router.post(
  "/signup",
  schemaValidator({ bodySchema: USER_SIGNUP_SCHEMA }),
  authControllers.signUp
);

router.post(
  "/signin",
  schemaValidator({ bodySchema: USER_SIGNIN_SCHEMA }),
  authControllers.signIn
);

export default router;
