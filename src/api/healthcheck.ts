import { Router, Request, Response } from "express";

const router = Router();

router.post("/healthcheck", (req: Request, res: Response) => {
  return res.status(200).send({ message: "Server online" });
});

export default router;
