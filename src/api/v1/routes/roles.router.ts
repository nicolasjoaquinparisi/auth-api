import { Router } from "express";
import findController from "../controllers/users/find.controller";

const router = Router();

router.get("/", findController);

export default router;
