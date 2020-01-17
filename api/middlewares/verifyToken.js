
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const keys = require('../../config/keys');

let opts = {};
opts.secretOrKey = keys.secret;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

module.exports = passport => {
  passport.use(new jwtStrategy(
    opts, (jwt_payload, done) => {
      db.auth.findOne({
        where: { id: Number(jwt_payload.id) }
      })
        .then(user => {
          if (user == null) {
            return done(null, false);
          } else {
            return done(null, user.dataValues)
          }
        })
        .catch(error => console.log(error));
    }
  ));

  // serialize
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  // deserialize
  passport.deserializeUser((id, done) => {
    User.findOne(id)
      .then(user => {
        done(null, user);
      })
  });

}