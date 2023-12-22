import ErrorBase from "../ErrorBase";

export default class WeakPasswordError extends ErrorBase {
  constructor(message: string) {
    super({ message: message, status: 400 });
    this.name = "WeakPasswordError";
  }
}
