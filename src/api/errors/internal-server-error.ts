import { CustomError } from './custom-error';

export class InternalServerError extends CustomError {
  statusCode = 500;

  constructor(public response: string) {
    super(response);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors = () => this.response;
}
