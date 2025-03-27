import { Router } from "express";
import { ERoles } from "@prisma/client";
import usersControllers from "./usersControllers";
import tokenAuthorization from "../../middlewares/tokenAuthorization";

const router = Router();

router.get(
  "/profile",
  tokenAuthorization([ERoles.USER, ERoles.ADMIN]),
  usersControllers.getUserProfile
);

export default router;
