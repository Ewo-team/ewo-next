/**
 * @module Server.Express.Routes
 * ExpressJS Default Routes
 */

import express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express', user: req.session.user });
});

export default router;
