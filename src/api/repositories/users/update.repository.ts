import { prisma } from "../../../database/prisma";

export type TUpdateUser = {
  userId: string;
  logins: number;
};

export default async function update({ userId, logins }: TUpdateUser) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      logins: logins,
      lastLogin: new Date(),
    },
  });
}
