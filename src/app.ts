import express, { json, urlencoded } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import corsOptions from "./middlewares/cors";
import { config } from "dotenv";
import connectToDatabase from "./database/prisma";
import healthcheck from "./api/healthcheck";
import authRouter from "./api/v1/routes/auth.router";
import usersRouter from "./api/v1/routes/users.router";
import errorHandler from "./middlewares/errorHandler";

config();

const PORT = process.env.PORT;
const app = express();

connectToDatabase();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use("/api", healthcheck);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`✨ Auth API running on PORT ${PORT}`);
});
