import { Router } from "express";
import infoController from "../controllers/users/info.controller";
import authorization from "../../../middlewares/authorization";
import checkPermissions from "../../../middlewares/checkPermissions";

const router = Router();

router.get(
  "/info",
  authorization,
  checkPermissions(["user:profile"]),
  infoController
);

export default router;
