import findOneRepository, {
  TQuery,
} from "../../repositories/roles/findOne.repository";

export default async function findOne(query: TQuery) {
  return await findOneRepository(query);
}
