import bcrypt from "bcryptjs";
import AccountBlockedError from "../../../errors/AccountBlockedError";
import InvalidCredentialserror from "../../../errors/InvalidCredentialsError";
import findByEmailRepository from "../../repositories/users/findByEmail.repository";
import update from "../../repositories/users/update.repository";
import { createAccessToken } from "../../../utils/security/jwt";

export type SigninServiceData = {
  email: string;
  password: string;
};

export default async function signin({ data }: { data: SigninServiceData }) {
  const { email, password } = data;

  let user = await findByEmailRepository(email);

  if (!user) {
    throw new InvalidCredentialserror("Invalid credentials");
  }

  if (user.isBlocked) {
    throw new AccountBlockedError("Account is blocked");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new InvalidCredentialserror("Invalid credentials");
  }

  user = await update({ userId: user.id, logins: user.logins + 1 });

  const accessTokenPayload = {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };

  const { accessToken, expiresIn } = createAccessToken(accessTokenPayload);

  const payload = {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      publicMetadata: user.publicMetadata,
    },
    accessToken: accessToken,
    expiresIn: expiresIn,
  };

  return payload;
}
