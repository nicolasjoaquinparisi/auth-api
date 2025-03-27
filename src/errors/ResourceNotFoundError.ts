import HTTPResponseError from "./HTTPResponseError";

export default class ResourceNotFoundError extends HTTPResponseError {
  constructor(message: string) {
    super({ message: message, status: 404 });
    this.name = "ResourceNotFoundError";
  }
}
