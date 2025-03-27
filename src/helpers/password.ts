import bcrypt from "bcryptjs";

const saltRounds = 10;

async function hash(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

async function compare(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export default {
  hash,
  compare,
};
