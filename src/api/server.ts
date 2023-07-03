import 'reflect-metadata';
import { log } from '../api/utils';
import App from './app';
import { ServerPort } from '../constants';

const PORT = ServerPort || 4010;

const start = async () => {
  try {
    log.info('Server starting...');
    const app = new App();
    app.initialize();

    app.defaultApp.listen(PORT, () => log.info('Server listening on port ' + PORT));
  } catch (error) {
    log.error('Start error', error);
  }
};
start();
