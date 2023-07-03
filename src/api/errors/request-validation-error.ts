import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 403;

  constructor(public errors: ValidationError[]) {
    super('Invalid field values');
    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    let _err = '';
    this.errors.map((err) => {
      if (_err) {
        _err += _err + ', ' + err.msg;
      } else {
        _err = err.msg;
      }
    });
    return _err;
  }
}
