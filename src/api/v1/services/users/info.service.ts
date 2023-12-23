import UserNotFoundError from "../../../errors/UserNotFoundError";
import findUserById from "../../repositories/users/findById.repository";

export type InfoServiceData = {
  userId: string;
};

export default async function signin({ data }: { data: InfoServiceData }) {
  const { userId } = data;

  let user = await findUserById(userId);

  if (!user) {
    throw new UserNotFoundError("Unauthorized");
  }

  const payload = {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      publicMetadata: user.publicMetadata,
    },
  };

  return payload;
}
