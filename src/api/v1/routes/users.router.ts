import { Router } from "express";
import infoController from "../controllers/users/info.controller";
import authorization from "../../../middlewares/authorization";

const router = Router();

router.get("/info", authorization, infoController);

export default router;
