import ErrorBase from "./ErrorBase";

export default class RoleNotFoundError extends ErrorBase {
  constructor(message: string) {
    super({ message: message, status: 404 });
    this.name = "RoleNotFoundError";
  }
}
