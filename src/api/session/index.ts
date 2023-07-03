import RedisStore from 'connect-redis';
import { Application as ExpressApp } from 'express';
import session from 'express-session';
import * as redis from 'redis';
import { log } from '../utils';
import { RedisPass, RedisPort, RedisURL, SessionSecret } from '../../constants';

// const globalAny: any = global;

export default class SessionStore {
  public sessionStore(app: ExpressApp): void {
    // configure redis
    const redisClient = redis.createClient({
      url: RedisURL ?? `redis://:${RedisPass ?? ''}@localhost:${RedisPort ?? 6379}`
    });

    redisClient.connect().catch(log.error);

    const redisStore = new RedisStore({
      client: redisClient,
      prefix: 'cyber_cine:'
    });
    const sessionMiddleware = session({
      store: redisStore,
      secret: SessionSecret ?? 'dudedogsarethebest',
      saveUninitialized: false,
      resave: false,
      name: 'sessionId',
      cookie: {
        secure: process.env.NODE_ENV === 'production', // if true: only transmit cookie over https, in prod, always activate this
        httpOnly: true, // if true: prevents client side JS from reading the cookie
        maxAge: 1000 * 60 * 60 * 24 // session max age in milliseconds - 24hrs
      }
    });
    app.use(sessionMiddleware);
  }
}
