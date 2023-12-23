import ErrorBase from "./ErrorBase";

export default class UserNotFoundError extends ErrorBase {
  constructor(message: string) {
    super({ message: message, status: 401 });
    this.name = "UserNotFoundError";
  }
}
