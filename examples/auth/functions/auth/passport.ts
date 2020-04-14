import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from './schema';

export default passport.use(
  new Strategy(
    { usernameField: "username", passwordField: "password" },
    (username, password, done) =>
      User.query()
        .where("username", username)
        .first()
        .eager("roles")
        .then((user) => {
          if (!user) return done("Unknown user");
          if (!user.active) return done("User is inactive");

          return user.verifyPassword(password, function (err, passwordCorrect) {
            if (err) return done(err);
            if (!passwordCorrect) return done("Invalid password");

            return done(null, user);
          });
        })
        .catch((err) => done(err))
  )
);
