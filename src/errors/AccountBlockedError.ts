import ErrorBase from "./ErrorBase";

export default class AccountBlockedError extends ErrorBase {
  constructor(message: string) {
    super({ message: message, status: 401 });
    this.name = "AccountBlockedError";
  }
}
