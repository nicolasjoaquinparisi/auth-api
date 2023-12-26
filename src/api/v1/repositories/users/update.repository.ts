import { prisma } from "../../../../database/prisma";

export type TUpdateUser = {
  userId: string;
  logins: number;
};

export default async function update({ userId, logins }: TUpdateUser) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      logins: true,
      lastLogin: true,
      publicMetadata: true,
      privateMetadata: true,
      isBlocked: true,
      roleId: true,
      role: {
        select: {
          name: true,
          permissions: {
            select: {
              permission: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      permissions: {
        select: {
          permission: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    data: {
      logins: logins,
      lastLogin: new Date(),
    },
  });
}
