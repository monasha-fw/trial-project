import { NextFunction, Request, Response } from 'express';

export const authorize = (roles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.session?.user) {
      return res.status(401).send('Unauthorized');
    }

    /** Update Session last updated time*/
    // if (!!req?.session?.user) {
    //   req.session.user = {
    //     ...req.session.user,
    //     lastUsed: new Date()
    //   };
    // }

    next();
  };
};
