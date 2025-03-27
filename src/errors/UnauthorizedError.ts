import HTTPResponseError from "./HTTPResponseError";

export default class UnauthorizedError extends HTTPResponseError {
  constructor(message: string) {
    super({ message: message, status: 401 });
    this.name = "UnauthorizedError";
  }
}
