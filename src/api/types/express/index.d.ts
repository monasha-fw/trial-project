import 'express-session';
import { ISessionUser } from 'src/api/interfaces';

declare module 'express-session' {
  interface SessionData {
    user: ISessionUser | null;
  }
}
