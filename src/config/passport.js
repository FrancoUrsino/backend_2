import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/user.js";
import { isValidPassword } from "../utils/hash.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";

passport.use('login', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user || !isValidPassword(user, password)) return done(null, false);
    return done(null, user);
  }
));

passport.use('current', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: "jwtSecret"
}, async (jwtPayload, done) => {
  const user = await User.findById(jwtPayload.id);
  if (!user) return done(null, false);
  return done(null, user);
}));
