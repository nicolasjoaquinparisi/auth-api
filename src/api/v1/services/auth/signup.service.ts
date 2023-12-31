import findByEmailRepository from "../../repositories/users/findByEmail.repository";
import createUserRepository from "../../repositories/users/create.repository";
import {
  generatePassword,
  isValidPassword,
} from "../../../../utils/security/password";
import WeakPasswordError from "../../../../errors/WeakPasswordError";
import EmailConflictError from "../../../../errors/EmailConflictError";
import findOneRoleService from "../../services/roles/findOne.service";
import RoleNotFoundError from "../../../../errors/RoleNotFoundError";

export type SignupServiceData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default async function signup({ data }: { data: SignupServiceData }) {
  const { email, password, firstName, lastName } = data;

  let isEmailInUse;
  let hashedPassword;
  let createdUser;

  isEmailInUse = await findByEmailRepository(email);

  if (isEmailInUse) {
    throw new EmailConflictError(`the email ${email} is already in use`);
  }

  if (!isValidPassword(password)) {
    throw new WeakPasswordError("password is too weak");
  }

  try {
    hashedPassword = await generatePassword(password);
  } catch (error) {
    console.error(`failed to hash password: ${error}`);
    throw error;
  }

  const userRole = await findOneRoleService({ name: "User" });

  if (!userRole) {
    throw new RoleNotFoundError("Role not found");
  }

  createdUser = await createUserRepository({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    roleId: userRole.id,
  });

  return createdUser;
}
