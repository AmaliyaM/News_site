const express = require('express');
const passport = require('passport');
const multer = require('multer');

const { News } = require('../models');

const router = express.Router();

const upload = multer({
  dest: 'public/images',
});

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  News
    .findAll()
    .then((news) => res.status(200).send(news))
    .catch((error) => { res.status(400).send(error); });
  return null;
});

router.get('/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  News
    .findAll({
      where: {
        author_id: req.params.id,
      },
    })
    .then((news) => res.status(200).send(news))
    .catch((error) => { res.status(400).send(error); });
  return null;
});

router.post('/', passport.authenticate('jwt', { session: false }), upload.any(), (req, res) => {
  const {
    files,
    body: {
      text,
      tags,
      theme,
      author_id,
      author_name,
    },
  } = req;

  News
    .create({
      text,
      tags,
      theme,
      author_id,
      author_name,
      image: files[0] ? files[0].filename : null,
    })
    .then((news) => res.status(201).send(news))
    .catch((error) => res.status(400).send(error));
  return null;
});
module.exports = router;
