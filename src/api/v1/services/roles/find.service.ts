import findAll from "../../repositories/roles/findAll.repository";

export default async function find() {
  const roles = await findAll();

  return { roles: roles };
}
