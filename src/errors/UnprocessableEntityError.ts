import HTTPResponseError from "./HTTPResponseError";

export default class UnprocessableEntityError extends HTTPResponseError {
  constructor(message: string) {
    super({ message: message, status: 422 });
    this.name = "UnprocessableEntityError";
  }
}
