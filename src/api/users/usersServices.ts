import ResourceNotFoundError from "../../errors/ResourceNotFoundError";
import usersRepositories from "./usersRepositories";

async function getUserProfile(userId: string) {
  let user;

  try {
    user = await usersRepositories.findUnique({ where: { id: userId } });
  } catch (error) {
    throw new Error(`Error getting user profile by id ${userId}. ${error}`);
  }

  if (!user) {
    throw new ResourceNotFoundError(`User with id ${userId} not found`);
  }

  return user;
}

export default { getUserProfile };
