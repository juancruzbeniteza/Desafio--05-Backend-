const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserDao = require('../server/data/mongo/users.dao');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await UserDao.findByEmail(email);
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserDao.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
