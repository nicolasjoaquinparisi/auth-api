import { env } from "../config/env";
import { PrismaClient } from "@prisma/client";

const DATABASE_URLS = {
  test: env.TEST_DATABASE_URL,
  development: env.DATABASE_URL,
  production: env.DATABASE_URL,
};

type TEnvironments = "development" | "test" | "production";

const environment = env.NODE_ENV as TEnvironments;

const prisma = new PrismaClient({
  datasources: { db: { url: DATABASE_URLS[environment] } },
});

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.info(`✨ Connected to database in ${env.NODE_ENV} mode`);
  } catch (error) {
    console.error(error);
  }
}

async function disconnectFromDatabase() {
  await prisma.$disconnect();
  console.info(`Disconnected from database in ${env.NODE_ENV} mode`);
}

export default prisma;
export { connectToDatabase, disconnectFromDatabase };
