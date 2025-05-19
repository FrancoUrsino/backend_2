import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/user.model.js";
import { isValidPassword, hashPassword } from "../utils/hash.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";
import createCart from '../services/cart.service.js';

export const initPassport = () => {
  passport.use('register', new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name, age, role } = req.body;
        if (!first_name || !last_name || !age || !email || !password) {
          return done(null, false, { message: 'Missing required fields' });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
          return done(null, false, { message: 'Este mail ya está registrado' });
        }
        const hashedPassword = await hashPassword(password);
        const cart = await createCart();
        const newUser = await User.create({
          first_name,
          last_name,
          email,
          age,
          role: role || 'user',
          password: hashedPassword,
          cart: cart?._id,
        });
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
  );

  passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: 'Usuario no encontrado' });
  
        const isPasswordCorrect = await isValidPassword(user, password);
        if (!isPasswordCorrect) return done(null, false, { message: 'Contraseña incorrecta' });
  
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));
  
  passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET,
  }, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (!user) return done(null, false, { message: 'User not found' });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.use('current', passport._strategies.jwt);
};