import express, { json, urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env";
import { connectToDatabase } from "./database/prisma";

import requestId from "./middlewares/requestId";
import corsOptions from "./middlewares/cors";
import requestLogger from "./middlewares/requestLogger";
import errorHandler from "./middlewares/errorHandler";

import authRouter from "./api/auth/authRouter";
import usersRouter from "./api/users/usersRouter";

const { API_PORT } = env;

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(corsOptions));
app.use(requestId);
app.use(requestLogger);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use(errorHandler);

export { app };

const startServer = async () => {
  const server = app.listen(API_PORT, async () => {
    await connectToDatabase();
    console.info(
      `✨ Server running in ${env.NODE_ENV} mode on PORT ${API_PORT}`
    );
  });
  return server;
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export { startServer };

const server = app;
export default server;
