import * as fs from 'fs';

const routes: { [key: string]: any } = {};

fs.readdirSync(__dirname + '/').forEach(function (file) {
  if ((file.match(/\.ts$/) !== null && file !== 'index.ts') || (file.match(/\.js$/) !== null && file !== 'index.js')) {
    const name = file.replace('.ts', '').replace('.js', '');
    routes[name] = require('./' + file).default;
  }
});
export default routes;
