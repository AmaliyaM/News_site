require('../config/passport');
const express = require('express');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const router = express.Router();

router.post('/signup', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username) {
    res.status(400).send({ msg: 'Please pass email, username and password.' });
  } else {
    Users
      .create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => {
        res.status(400).send(error);
      });
  }
});

router.post('/signin', (req, res) => {
  Users
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(401).send({
          message: 'Authentication failed. User not found.',
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(JSON.parse(JSON.stringify(user)),
            process.env.PASSPORT_SECRET, { expiresIn: 86400 * 30 });
          res.json({
            success: true, token: `JWT ${token}`,
          });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
      return null;
    })
    .catch((error) => res.status(400).send(error));
});
module.exports = router;
