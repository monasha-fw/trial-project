export abstract class CustomError extends Error {
  abstract statusCode: number;

  protected constructor(response: string) {
    super(response);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): string;
}
