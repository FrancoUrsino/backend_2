import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res
      .cookie('jwtCookieToken', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .json({ message: 'Login exitoso', user });
  })(req, res, next);
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ status: 'success', user: req.user });
  }
);

export default router;
