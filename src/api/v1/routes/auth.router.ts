import { Router } from "express";
import signupController from "../controllers/auth/signup.controller";
import signinController from "../controllers/auth/signin.controller";
import { signupSchema, signinSchema } from "../../../utils/requestSchemas";
import validate from "../../../middlewares/requestValidations";

const router = Router();

router.post("/signup", validate(signupSchema), signupController);
router.post("/signin", validate(signinSchema), signinController);

export default router;
