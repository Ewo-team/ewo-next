/**
 * @module Server.Express.Routes.Users
 * ExpressJS Users-related Routes
 */

import { login, logout, register } from '@engine/Users/actions';
import { User } from '@models';
import express = require('express');
import { check, validationResult } from 'express-validator/check';
import { checkAnon, checkSignIn, hash } from '../auth';

const router = express.Router();

const views = {
  index: 'users',
  login: 'users/login',
  signup: 'users/signup',
};

/* GET users listing. */
router.get('/', checkSignIn, (_req, res) => {
  res.render(views.index);
});

router.get('/signup', checkAnon, (_req, res) => {
  res.render(views.signup);
});

router.get('/login', checkAnon, (_req, res) => {
  res.render(views.login);
});

router.get('/logout', (req, res) => {
  req.reduxStore.dispatch(logout(req.sessionID));
  req.session.destroy(() => {
    console.log('user logged out.');
  });
  res.redirect('/users/login');
});

/* POST users listing. */

const userExist = (value, { req }) => {
  if (value === '') {
    return true;
  }
  return req.reduxStore.getState().Users.find((u) => {
    return u.name === value || u.email === req.body.email;
  }) === undefined;
};

const errorFlash = 'alert-danger';
router.post(
  '/signup',
  [
    checkAnon,
    check('username', 'Le nom d\'utilisateur est requis').exists(),
    check('email', 'L\'adresse e-mail est requise').exists(),
    check('email', 'L\'adresse e-mail n\'est pas valide').isEmail(),
    check('password', 'Le mot de passe est requis').exists(),
    check('password', 'Le mot de passe doit faire minimum 5 caracters').isLength({ min: 5 }),
    check('confirm_pass', 'La confirmation du mot de passe est requise').exists(),
    check('confirm_pass', 'La confirmation du mot de passe n\'est pas valide').custom((value, { req }) => value === req.body.password),
    check('username', 'L\'utilisateur existe déjà').custom(userExist),
  ],
  (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      const body = {
        username: req.body.username,
        email: req.body.email,
      };

      const message = { flash: { type: errorFlash, messages: errors.array() }, ...body };

      res.render(views.signup, message);
    } else {
      const password = req.body.password;

      const hashed = hash(password);

      const newUser = { name: req.body.username, hash: hashed, email: req.body.email } as User;
      req.session.user = newUser;

      newUser.token = req.sessionID;
      req.reduxStore.dispatch(register(newUser));
      res.redirect('/users/');
    }
  });

router.post(
  '/login',
  [
    checkAnon,
    check('username', 'Le nom d\'utilisateur est requis').exists(),
    check('password', 'Le mot de passe est requis').exists(),
  ],
  (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      const body = {
        username: req.body.username,
        password: req.body.password,
      };

      const message = { flash: { type: errorFlash, messages: errors.array() }, ...body };

      res.render(views.login, message);
    } else {
      const user: User = req.reduxStore.getState().Users.find(u => {
        return u.name === req.body.username;
      });

      const hashed = hash(req.body.password);
      if (user && user.hash === hashed) {
        req.session.user = { id: user.id, name: user.name };
        req.reduxStore.dispatch(login(user.name, req.sessionID));
        res.redirect('/');
      } else {
        res.render(views.login, { flash: { type: errorFlash, message: 'Invalid credentials!' } });
      }
    }

  });

export default router;
