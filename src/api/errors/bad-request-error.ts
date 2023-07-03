import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(private response: string) {
    super(response);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors = () => this.response;
}
