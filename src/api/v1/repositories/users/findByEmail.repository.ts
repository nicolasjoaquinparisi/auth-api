import { prisma } from "../../../../database/prisma";

export default async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}
