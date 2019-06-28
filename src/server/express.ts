/**
 * @module Server.Express
 * ExpressJS Server
 */

import express = require('express');
import session = require('express-session');
import logger = require('morgan');
import sassMiddleware = require('node-sass-middleware');
import path = require('path');
import indexRoutes from './routes';
import usersRoutes from './routes/users';

export class ExpressServer {

  public readonly session;
  public readonly app;

  public constructor(reduxStoreMiddleware) {
    const app = express();

    // View engine
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'pug');

    const FileStore = require('session-file-store')(session);

    // Session manager
    this.session = session({
      secret: 'my-secret',
      store: new FileStore({ logFn: () => { } }),
      cookie: {
        secure: false, // false for dev, true for prod
      },
      resave: false,
      saveUninitialized: false,
    });

    // Middlewares
    app.use(reduxStoreMiddleware);
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(sassMiddleware({
      src: path.join(__dirname, 'public'),
      dest: path.join(__dirname, 'public'),
      indentedSyntax: false, // true = .sass and false = .scss
      sourceMap: true,
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, '../..', 'dist', 'client')));
    app.use(this.session);

    app.use('/users', usersRoutes);
    app.use('*', indexRoutes);

    // error handler
    app.use((err, req, res, _next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    this.app = app;
  }
}
