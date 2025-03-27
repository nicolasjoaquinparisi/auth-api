import { $Enums, Prisma } from "@prisma/client";
import prisma from "../../database/prisma";
import { DefaultArgs } from "@prisma/client/runtime/library";

function create({
  data,
}: {
  data: Prisma.UserCreateInput;
}): Prisma.Prisma__UserClient<
  {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  },
  never,
  DefaultArgs
> {
  return prisma.user.create({
    data,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
}

function findUnique({
  where,
  select,
}: {
  where: Prisma.UserWhereUniqueInput;
  select?: Prisma.UserSelect;
}): Promise<Prisma.UserGetPayload<{ select: typeof select }> | null> {
  return prisma.user.findUnique({
    where,
    select,
  });
}

function update({ id, data }: { id: string; data: Prisma.UserUpdateInput }) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

function deleteOne(id: string): Prisma.Prisma__UserClient<
  {
    id: string;
    email: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    createdAt: Date;
    updatedAt: Date;
    role: $Enums.ERoles;
  },
  never,
  DefaultArgs
> {
  return prisma.user.delete({
    where: {
      id,
    },
  });
}

export default {
  create,
  update,
  findUnique,
  deleteOne,
};
