import jwt from 'jsonwebtoken';
import passport from 'passport';

export const handleLogin = (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res
      .cookie('jwtCookieToken', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      })
      .json({ message: 'Log in exitoso', user });
  })(req, res, next);
};

export const handleRegister = (req, res, next) => {
  passport.authenticate('register', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info?.message || 'Error en el registro' });

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  })(req, res, next);
};

export const handleCurrent = (req, res) => {
  res.json({ status: 'success', user: req.user });
};

export const handleLogout = (req, res) => {
  res.clearCookie('jwtCookieToken');
  res.json({ message: 'Log out exitoso' });
};