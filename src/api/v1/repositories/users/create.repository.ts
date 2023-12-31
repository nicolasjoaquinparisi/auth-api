import { prisma } from "../../../../database/prisma";

export type TCreateUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId: string;
};

export default async function create({
  email,
  password,
  firstName,
  lastName,
  roleId,
}: TCreateUser) {
  return await prisma.user.create({
    data: {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      roleId: roleId,
    },
  });
}
