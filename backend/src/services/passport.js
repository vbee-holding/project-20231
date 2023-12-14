const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CALLBACK_URL,
} = require("../config");

const passportService = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ googleId: profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          const newUser = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username:
              profile.displayName ||
              `${profile.name.givenName} ${profile.name.familyName}`,
            profileImgUrl: profile.photos[0].value,
          });
          await newUser.save();
          done(null, newUser);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

module.exports = passportService;
