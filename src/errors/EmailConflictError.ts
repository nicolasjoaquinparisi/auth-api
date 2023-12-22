import ErrorBase from "./ErrorBase";

export default class EmailConflictError extends ErrorBase {
  constructor(message: string) {
    super({ message: message, status: 409 });
    this.name = "EmailConflictError";
  }
}
