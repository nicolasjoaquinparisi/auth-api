import bcrypt from "bcryptjs";
import AccountBlockedError from "../../../../errors/AccountBlockedError";
import InvalidCredentialserror from "../../../../errors/InvalidCredentialsError";
import findByEmailRepository from "../../repositories/users/findByEmail.repository";
import update from "../../repositories/users/update.repository";
import { createAccessToken } from "../../../../utils/security/jwt";

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

  const updatedUser = await update({
    userId: user.id,
    logins: user.logins + 1,
  });

  const userPermissions = [
    ...updatedUser.role.permissions.map(
      (permissionOnRole) => permissionOnRole.permission.name
    ),
    ...updatedUser.permissions.map(
      (permissionOnUser) => permissionOnUser.permission.name
    ),
  ];

  const tokenPayload = {
    id: updatedUser.id,
    role: updatedUser.role.name,
    permissions: userPermissions,
  };

  const { accessToken, expiresIn } = createAccessToken(tokenPayload);

  const payload = {
    user: {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      logins: updatedUser.logins,
      lastLogin: updatedUser.lastLogin,
      publicMetadata: updatedUser.publicMetadata,
      role: updatedUser.role.name,
      permissions: userPermissions,
    },
    accessToken: accessToken,
    expiresIn: expiresIn,
  };

  return payload;
}
