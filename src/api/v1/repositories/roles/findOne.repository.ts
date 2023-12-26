import { prisma } from "../../../../database/prisma";

export type TQuery = {
  id?: string;
  name?: string;
};

export default async function findOne(query: TQuery) {
  return await prisma.role.findFirst({
    where: { ...query },
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
