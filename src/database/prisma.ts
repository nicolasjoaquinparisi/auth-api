import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

export default async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.info(`✨ connected to database`);
  } catch (error) {
    console.error(error);
  }
}

export { prisma };
