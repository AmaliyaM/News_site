const passport = require('passport');
const passportJWT = require('passport-jwt');
const { Users } = require('../models');

const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy = passportJWT.Strategy;

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_SECRET,
},
((jwtPayload, cb) => Users.findByPk(jwtPayload.id)
  .then((user) => cb(null, user))
  .catch((err) => cb(err))
)));
module.exports = passport;
