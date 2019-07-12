/**
 * @module Server.Express.Routes
 * ExpressJS Default Routes
 */

import express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (_req: express.Request, res) => {
  res.render('index');
});

export default router;
