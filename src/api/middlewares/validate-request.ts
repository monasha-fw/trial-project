import { RequestValidationError } from '../errors';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import log from '../utils/log';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    log.error(errors);

    throw new RequestValidationError(errors.array());
  }

  next();
};
