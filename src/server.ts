import http from 'http';
import debug from 'debug';

import app from './app';
import { Address } from './core/interfaces';

debug('parco-app-challenge:server');

const port = normalizePort(process.env.PORT) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process.on('uncaughtException', (e) => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  console.log(e);
  process.exit(1);
});

function normalizePort(val) {
  const numberPort = parseInt(val, 10);
  if (isNaN(numberPort)) return val;
  if (numberPort >= 0) return numberPort;
  return false;
}

function onListening() {
  const addr: Address = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
  debug(`Listening on ${bind}`);
}

function onError(error): never {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
