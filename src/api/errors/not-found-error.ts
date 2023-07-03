import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public response: string) {
    super(response);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors = () => this.response;
}
