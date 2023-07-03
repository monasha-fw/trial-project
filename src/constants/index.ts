import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const { PORT, SESSION_SECRET, DATABASE_URL, REDIS_PASS, REDIS_URL, REDIS_PORT } = process.env;

export {
  PORT as ServerPort,
  SESSION_SECRET as SessionSecret,
  DATABASE_URL as DatabaseURL,
  REDIS_URL as RedisURL,
  REDIS_PASS as RedisPass,
  REDIS_PORT as RedisPort
};
