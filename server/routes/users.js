const express = require('express');
const passport = require('passport');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const router = express.Router();

const upload = multer({
  dest: 'public/images',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('Please upload an image.'));
    }
    cb(undefined, true);
  },
});

router.get('/:id', (req, res) => {
  const { id: userId } = req.params;
  Users
    .findOne({
      where: {
        id: userId,
      },
    })
    .then((user) => res.status(200).send(
      { userName: user.username, email: user.email, avatar: user.avatar },
    ))
    .catch((error) => { res.status(400).send(error); });
});

router.put('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.params;
  const data = req.body;
  Users
    .update(data, {
      where: {
        id,
      },
      individualHooks: true,
    })
    .then((user) => res.status(200).send({ userName: user.username, email: user.email }))
    .catch((error) => { res.status(400).send(error); });
});

router.post('/avatar/:id', upload.single('avatar'), (req, res) => {
  const { file, params: { id } } = req;

  Users
    .update({ avatar: file.filename }, {
      where: {
        id,
      },
    })
    .then(async () => {
      let token = '';
      await Users
        .findOne({
          where: {
            id,
          },
        })
        .then((user) => {
          token = jwt.sign(JSON.parse(JSON.stringify(user)),
            process.env.PASSPORT_SECRET, { expiresIn: 86400 * 30 });
        });
      res.status(200).json({
        success: true, token: `JWT ${token}`,
      });
    })
    .catch((error) => { res.status(400).send(error); });
});

module.exports = router;
