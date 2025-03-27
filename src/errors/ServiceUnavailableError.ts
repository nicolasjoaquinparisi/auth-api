import HTTPResponseError from "./HTTPResponseError";

export default class ServiceUnavailableError extends HTTPResponseError {
  constructor(message: string) {
    super({ message: message, status: 503 });
    this.name = "ServiceUnavailableError";
  }
}
