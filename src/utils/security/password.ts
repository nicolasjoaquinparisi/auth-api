import { genSalt, hash } from "bcryptjs";

export async function generatePassword(password: string): Promise<string> {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  return await hash(password, salt);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}
