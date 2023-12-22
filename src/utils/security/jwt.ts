import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? "";
const EXPIRATION_TIME = process.env.EXPIRATION_TIME ?? "3600";

export function createAccessToken({
  user,
}: {
  user: { id: string; firstName: string; lastName: string; email: string };
}) {
  const expiresIn = Number(EXPIRATION_TIME);

  if (!user) {
    throw new Error("Missing user data");
  }

  const payload = {
    user: user,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return { accessToken: token, expiresIn: expiresIn };
}

export function decodeAccessToken(accessToken: string) {
  return jwt.verify(accessToken, JWT_SECRET);
}
