import { Router } from 'express';
import passport from 'passport';
import { handleLogin, handleRegister, handleCurrent, handleLogout} from '../controllers/sessions.controller.js';

const router = Router();

router.post('/login', handleLogin);
router.post('/register', handleRegister);
router.get('/current', passport.authenticate('current', { session: false }), handleCurrent);
router.get('/logout', handleLogout);

export default router;