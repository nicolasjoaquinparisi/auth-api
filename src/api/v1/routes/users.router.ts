import { Router } from "express";
import infoController from "../controllers/users/info.controller";

const router = Router();

router.get("/info", infoController);

export default router;
