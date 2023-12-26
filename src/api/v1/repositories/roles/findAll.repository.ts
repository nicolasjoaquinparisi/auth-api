import { prisma } from "../../../../database/prisma";

export default async function findAll() {
  return await prisma.role.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      permissions: {
        select: {
          permission: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });
}
