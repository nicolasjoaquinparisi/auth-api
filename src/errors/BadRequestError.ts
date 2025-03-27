import HTTPResponseError from "./HTTPResponseError";

export default class BadRequestError extends HTTPResponseError {
  constructor(message: string) {
    super({ message: message, status: 400 });
    this.name = "BadRequestError";
  }
}
