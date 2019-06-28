/**
 * @module Server.Express.Auth
 * ExpressJS Auth Middlewares
 */

import { UsersTools } from '@engine/Users/UsersTools';
import { User } from '@models';
import crypto = require('crypto');

export const checkSignIn = (req, res, next) => {

  if (req.session && req.session.user) {
    next();
  } else {
    req.session.error = 'Not logged in!';
    res.redirect('/users/login');
  }
};

export const checkCharIsOwnedRest = (req, res, next) => {

  if (req.params.mat) {

    if (!req.session.charOwned) {
      const user: User = req.session.user;
      req.session.charOwned = UsersTools.ownedChar(req.reduxStore, user);
    }

    if (req.session.charOwned.includes(Number(req.params.mat))) {
      next();
    } else {
      res.status(403).json({ error: 'not logged in' });
    }
  }
};

export const checkSignInRest = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(403).json({ error: 'not logged in' });
  }
};

export const checkAnon = (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

export const hash = password => crypto.pbkdf2Sync(password, 'salt', 1, 32, 'sha512').toString('hex');
