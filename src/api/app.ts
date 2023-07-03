import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import useragent from 'express-useragent';
import morgan from 'morgan';

import { CustomError } from './errors';
import Routes from './router';
import SessionStore from '../api/session';
import registerDependencyInjection from '../di';
import { log } from './utils';
import { container } from 'tsyringe';
import { DataContext } from '../infrastructure/database';

export default class App {
  public defaultApp!: Application;
  public routes: Routes = new Routes();
  public sessionStore: SessionStore = new SessionStore();

  public initialize = (): void => {
    this.defaultApp = express();
    this.config();
    this.registerDI();
    this.setSession();
    this.setRouter();
    this.errorHandling();
  };

  private config = (): void => {
    this.defaultApp.set('trust proxy', true);
    this.defaultApp.use(useragent.express());
    /* support application/json type post data */
    this.defaultApp.use(express.json());
    /* support application/x-www-form-urlencoded post data */
    this.defaultApp.use(express.urlencoded({ extended: false }));

    /* Logging */
    this.defaultApp.use(morgan('dev'));

    // cors
    // const whitelist = new Set([
    //   process.env.CORS_WHITELIST1,
    //   process.env.CORS_WHITELIST2,
    //   process.env.CLIENT_URL,
    // ]);
    this.defaultApp.use(
      cors({
        origin: function (origin, callback) {
          // callback(null, true);
          // if (origin && whitelist.has(origin)) {
          callback(null, true);
          // } else {
          //   log.debug("Cors Blocked : ", origin);
          //   // callback(null, true);
          //   callback(new Error("Not allowed by CORS"));
          // }
        },
        optionsSuccessStatus: 200,
        credentials: true
      })
    );

    // set express view engine for email template integration
    this.defaultApp.set('view engine', 'ejs');
  };

  private registerDI = async () => {
    await registerDependencyInjection();
    const db = container.resolve(DataContext);
    await db.initialize();
  };

  private setSession = (): void => this.sessionStore.sessionStore(this.defaultApp);

  private setRouter = (): void => this.routes.v1Routes(this.defaultApp);

  private errorHandling = (): void => {
    /* Error handling */
    this.defaultApp.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof CustomError) {
        log.error('Custom Error: ', err);
        return res.status(err.statusCode).send(err?.message ?? err);
      }

      log.error('Internal Server Error: ', err);
      res.status(500).send('Internal Server Error');
    });
  };
}
