import z from "zod";
import { ERoles, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import usersRepositories from "../users/usersRepositories";
import { USER_SIGNUP_SCHEMA, USER_SIGNIN_SCHEMA } from "./authSchemas";
import tokensServices from "../../helpers/tokens";
import passwordServices from "../../helpers/password";
import ConflictError from "../../errors/ConflictError";
import ServiceUnavailableError from "../../errors/ServiceUnavailableError";
import BadRequestError from "../../errors/BadRequestError";

type UserSignUpData = z.infer<typeof USER_SIGNUP_SCHEMA>;
type UserSignInData = z.infer<typeof USER_SIGNIN_SCHEMA>;

async function signUp({ data }: { data: UserSignUpData }): Promise<
  Prisma.Prisma__UserClient<
    {
      id: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
    },
    never,
    DefaultArgs
  >
> {
  const isEmailInUse = await usersRepositories.findUnique({
    where: { email: data.email },
    select: { id: true },
  });
  if (!!isEmailInUse) {
    throw new ConflictError(`Email ${data.email} already in use`);
  }

  let hashedPassword;
  try {
    hashedPassword = await passwordServices.hash(data.password);
  } catch (error) {
    throw new ServiceUnavailableError(
      `Failed to hash password. Error: ${error}`
    );
  }

  let user;
  try {
    user = await usersRepositories.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      },
    });
  } catch (error) {
    throw new ServiceUnavailableError(`Failed to create user. Error: ${error}`);
  }

  return user;
}

async function signIn({ data }: { data: UserSignInData }) {
  let existsUser;

  try {
    existsUser = await usersRepositories.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        password: true,
      },
    });
  } catch (error) {
    throw new ServiceUnavailableError(`Failed to find user. Error: ${error}`);
  }

  if (!existsUser) {
    throw new BadRequestError("Invalid email or password");
  }

  let isValidPassword;

  try {
    isValidPassword = await passwordServices.compare(
      data.password,
      existsUser.password
    );
  } catch (error) {
    throw new ServiceUnavailableError(
      `Failed to compare passwords. Error: ${error}`
    );
  }

  if (!isValidPassword) {
    throw new BadRequestError("Invalid email or password");
  }

  const { accessToken, expiresAt } = tokensServices.generateTokens(
    existsUser.id,
    existsUser.role as ERoles
  );

  return {
    user: existsUser,
    accessToken,
    expiresAt,
  };
}

export default { signUp, signIn };
