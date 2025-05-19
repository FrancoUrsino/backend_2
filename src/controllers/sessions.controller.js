import jwt from 'jsonwebtoken';
import passport from 'passport';
import UserDTO from "../dtos/user.dto.js";

export const handleLogin = (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || 'Credenciales inválidas' });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Log in exitoso',
      token,
      user: new UserDTO(user)
    });
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
  res.json({ status: 'success', user: new UserDTO(req.user) });
};

export const handleLogout = (req, res) => {
  // No hace falta borrar cookies si no se usa cookie
  res.json({ message: 'Log out exitoso' });
};
