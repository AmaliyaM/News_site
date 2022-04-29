const express = require('express');
const newsRourer = require('./news');
const authRouter = require('./auth');
const usersRouter = require('./users');

const router = express.Router();
router.use('/news', newsRourer);
router.use('/auth', authRouter);
router.use('/users', usersRouter);

module.exports = router;
