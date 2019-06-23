import { User } from '@models';
import { checkSignInRest } from '@server/auth';
import express = require('express');

const router = express.Router();

/* GET api page. */
router.get('/characters', checkSignInRest, (req, res) => {
  const user: User = req.session.user;
  const characters = req.reduxStore.getState().Characters.filter(c => c.owner === user.id).toList().toJSON();
  res.json(characters);
});

export default router;
