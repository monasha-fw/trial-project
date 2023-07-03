import { CustomError } from '../errors';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  // log.error(err);

  res.status(400).send({ response: 'Something went wrong' });
};
