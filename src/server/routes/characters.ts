/**
 * @module Server.Express.Routes.Users
 * ExpressJS Users-related Routes
 */

import { ListRaces } from '@models';
import express = require('express');
import { check, CustomValidator, validationResult } from 'express-validator/check';
import { checkSignIn } from '../auth';

const router = express.Router();

const views = {
  create: 'characters/create',
};

const raceSelector = (req: express.Request): string[] | null => {
  const characters = req.reduxStore.getState().Characters.filter(c => c.owner === req.session.user.id).toList();

  return characters.size === 0 ? null : [...characters.map(c => String(c.race)).toSet()];
};

/* GET characters listing. */
router.get('/create', checkSignIn, (req, res) => {
  const races = raceSelector(req);

  const options = {
    races: ListRaces,
    raceChoice: false,
    race: '',
  };

  if (races === null || races.length === 0) {
    options.raceChoice = true;
  } else {
    options.race = races[0];
  }

  res.render(views.create, options);
});

/* POST users listing. */

const nameExist: CustomValidator = (value: string, { req }) => {
  if (value === '') {
    return true;
  }
  return (req as express.Request).reduxStore.getState().Characters.find((c) => {
    return c.name.toLocaleLowerCase() === value.toLowerCase();
  }) === undefined;
};

const raceAllowed: CustomValidator = (value: string, { req }) => {

  const races = raceSelector(req as express.Request);

  if (races === null || races.length === 0) {
    return true;
  }

  return races.includes(value);
};

const errorFlash = 'alert-danger';
router.post(
  '/create',
  [
    checkSignIn,
    check('name', 'Le nom de personnage est requis').exists(),
    check('race', 'La race est requise').exists(),
    check('sexe', 'Le sexe est requis').exists(),
    check('sexe', "le sexe n'est pas valide").isInt({ min: 0, max: 2 }),
    check('race', "La race n'est pas valide").custom(raceAllowed),
    check('name', 'Le personnage existe déjà').custom(nameExist),
  ],
  (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      const body = {
        name: req.body.name,
        race: req.body.race,
        sexe: req.body.sexe,
      };

      const message = { flash: { type: errorFlash, messages: errors.array() }, ...body };

      res.render(views.create, message);
    } else {
      /*const password = req.body.password;

      const hashed = hash(password);

      const newUser = { name: req.body.username, hash: hashed, email: req.body.email } as User;
      req.session.user = newUser;

      newUser.token = req.sessionID;
      req.reduxStore.dispatch(register(newUser));
      res.redirect('/users/');*/
      console.log(req.body);
    }
  });

export default router;
