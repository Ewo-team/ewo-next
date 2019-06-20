import express = require('express');
import session = require('express-session');
import createError = require('http-errors');
import logger = require('morgan');
import sassMiddleware = require('node-sass-middleware');
import path = require('path');
import indexRoutes from './routes';
import usersRoutes from './routes/users';

declare var __basedir;

export class ExpressServer {

  public readonly session;
  public readonly app;

  public constructor(reduxStoreMiddleware) {
    const app = express();

    // View engine
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'pug');

    // Session manager
    this.session = session({
      secret: 'my-secret',
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
    app.use(express.static(path.join(__basedir, 'dist', 'client')));
    app.use(this.session);

    app.use('/', indexRoutes);
    app.use('/users', usersRoutes);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      next(createError(404));
    });

    // error handler
    app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    this.app = app;

    // authRoutes(app, store);

    // HTTP server, needed for Socket.IO
    /*this.http = require('http').Server(app);
    const port = process.env.PORT || 3000;

    app.set('port', port);
    // start our simple server up on localhost:3000
    this.server = this.http.listen(port, () => {
      // tslint:disable-next-line: no-console
      console.log('listening on *:' + port);
    });*/
  }
}
