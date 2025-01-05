// passport-config.ts

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../components/model/users.model";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user: any, done) => {
  process.nextTick(() => {
    done(null, user.id);
  });
});

passport.deserializeUser(async (id: string, done) => {
  process.nextTick(async () => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
});

// Google OAuth 2.0 setup (optional)
passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_GOOGLE_CLIENT_ID",
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
      callbackURL: "http://localhost:3000/auth/google/callback", // Adjust URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user based on Google profile
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName, // Or use email
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
