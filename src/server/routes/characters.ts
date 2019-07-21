/**
 * @module Server.Express.Routes.Users
 * ExpressJS Users-related Routes
 */

import { create } from '@engine/Characters/actions';
import { Races, RacesList } from '@engine/resources';
import { GenreFromString, UserRole } from '@models';
import express = require('express');
import { check, CustomValidator, validationResult } from 'express-validator/check';
import { checkSignIn } from '../auth';

const router = express.Router();

const views = {
  create: 'characters/create',
};

const availlableRaces = (req: express.Request): Array<{ id: string, name: string }> => {
  const characters = req.reduxStore.getState().Characters.filter(c => c.owner === req.session.user.id).toList();
  const user = req.reduxStore.getState().Users.find(u => u.id === req.session.user.id);

  if (user.role >= UserRole.Admin) {
    return RacesList.map(r => ({ id: r.id, name: r.name }));
  }

  if (characters.size === 0) {
    return RacesList.filter(r => r.playable).map(r => ({ id: r.id, name: r.name }));
  }

  const camps = characters.map(c => Races[c.race].camps);

  return RacesList.filter(r => camps.contains(r.camps) && r.playable).map(r => ({ id: r.id, name: r.name }));

};

/* GET characters listing. */
router.get('/create', checkSignIn, (req, res) => {

  const races = availlableRaces(req);

  const options = {
    races,
    raceChoice: false,
    race: null,
  };

  if (races.length !== 1) {
    options.raceChoice = true;
  } else {
    options.race = races[0].id;
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

  const races = availlableRaces(req as express.Request);

  if (races === null || races.length === 0) {
    return true;
  }

  return races.find(r => r.id === value);
};

const errorFlash = 'alert-danger';
router.post(
  '/create',
  [
    checkSignIn,
    check('name', 'Le nom de personnage est requis').exists(),
    check('race', 'La race est requise').exists(),
    check('genre', 'Le sexe est requis').exists(),
    check('genre', "le sexe n'est pas valide").isInt({ min: 0, max: 2 }),
    check('race', "La race n'est pas valide").custom(raceAllowed),
    check('name', 'Le personnage existe déjà').custom(nameExist),
  ],
  (req: express.Request, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      const body = {
        name: req.body.name,
        race: req.body.race,
        genre: req.body.genre,
      };

      const message = { flash: { type: errorFlash, messages: errors.array() }, ...body };

      res.render(views.create, message);
    } else {

      const genre = GenreFromString(req.body.genre);
      req.reduxStore.dispatch(create(req.session.user.id, req.body.name, req.body.race, genre));
      res.redirect('/');
    }
  });

export default router;
