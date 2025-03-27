import HTTPResponseError from "./HTTPResponseError";

export default class ConflictError extends HTTPResponseError {
  constructor(message: string) {
    super({ message: message, status: 409 });
    this.name = "ConflictError";
  }
}
