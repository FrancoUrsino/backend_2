import { Router } from 'express';
import passport from 'passport';
import { handleCurrent } from '../controllers/sessions.controller.js';

const router = Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Inicio' });
});

router.get('/api/sessions/login', (req, res) => {
  res.render('login', { title: 'Iniciar sesión' });
});

router.get('/api/sessions/register', (req, res) => {
  res.render('register', { title: 'Registro' });
});

router.get('/api/sessions/current', passport.authenticate('current', { session: false }), handleCurrent);

export default router;