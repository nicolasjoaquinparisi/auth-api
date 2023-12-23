import { prisma } from "../../../database/prisma";

export default async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}
