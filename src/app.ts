import express, { json, urlencoded, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import corsOptions from "./middlewares/cors";
import { config } from "dotenv";
import connectToDatabase from "./database/prisma";
import authRouter from "./api/routes/auth.router";
import errorHandler from "./middlewares/errorHandler";

config();

const PORT = process.env.PORT ?? 9000;
const app = express();

connectToDatabase();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use("/api/healthcheck", (req: Request, res: Response) => {
  return res.status(200).send({ message: "Server online" });
});
app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`✨ Auth API running on PORT ${PORT}`);
});
