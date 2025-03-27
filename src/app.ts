import express, { json, urlencoded } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { env } from "./config/env";
import { connectToDatabase } from "./database/prisma";
import swaggerOptions from "./docs/swagger";

import helmet from "./middlewares/helmet";
import requestId from "./middlewares/requestId";
import corsOptions from "./middlewares/cors";
import requestLogger from "./middlewares/requestLogger";
import errorHandler from "./middlewares/errorHandler";

import authRouter from "./api/auth/authRouter";
import usersRouter from "./api/users/usersRouter";

const { API_PORT } = env;

const app = express();

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(json());
app.use(urlencoded({ extended: true }));
// app.use(helmet);
// app.use(cors(corsOptions));
app.use(requestId);
app.use(requestLogger);

if (env.NODE_ENV !== "production") {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      swaggerOptions: {
        docExpansion: "list",
        filter: true,
      },
    })
  );
}

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

    if (env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
      console.info(
        `📘 Swagger Docs available at http://localhost:${API_PORT}/api-docs`
      );
    }
  });
  return server;
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export { startServer };

const server = app;
export default server;
