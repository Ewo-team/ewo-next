import { Store } from 'redux';
import { IState } from '../engine/reducers';
import { ExpressServer } from '../server/express';
import { startSocket } from '../server/socket';

// tslint:disable-next-line: no-var-requires
const debug = require('debug')('express:server');

import * as http from 'http';

declare var __basedir;

/*export const app = express();

export let http;

export let session;*/

declare global {
  namespace Express {
    interface Request {
      reduxStore: Store<IState>;
    }
  }
}

export class GameServer {

  // public readonly app;
  // public readonly http;
  // public readonly session;
  private server: http.Server;
  private readonly port: number | string | false;
  private readonly express: ExpressServer;
  private readonly store: Store;

  public constructor(store: Store<IState>) {

    const reduxStoreMiddleware = (iStore: Store) => (req, res, next) => {
      req.reduxStore = iStore;
      next();
    };

    this.express = new ExpressServer(reduxStoreMiddleware(store));

    this.port = this.normalizePort(process.env.PORT || '3000');

    this.store = store;

    this.onError = this.onError.bind(this);
    this.onListening = this.onListening.bind(this);

  }

  public launch() {

    this.express.app.set('port', this.port);

    this.server = http.createServer(this.express.app);

    this.server.listen(this.port);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening);

    // startSocket(this.server, this.express.session, this.store);
  }

  /**
   * Normalize a port into a number, string, or false.
   * @param val
   */
  private normalizePort(val): number | string | false {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   * @param error
   */
  private onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const port = this.port;

    const bind = typeof port === 'string'
      ? `Pipe ${port}`
      : `Port ${port}`;

    // handle specific listen errors with friendly messages
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

  /**
   *
   */
  private onListening() {
    const addr = this.server.address();

    if (addr === null || addr === undefined) {
      debug('Error on listening, no address found');
      console.log('Error on listening, no address found');
      return;
    }

    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
    console.log(`Listening on ${bind}`);
  }
}
