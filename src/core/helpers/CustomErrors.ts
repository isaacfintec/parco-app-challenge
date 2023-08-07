export class CustomError extends Error {
  code: number;

  constructor(code, message) {
    super();
    this.code = code;
    this.message = message;
  }
}
