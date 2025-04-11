import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './config/passport.js';
import sessionRouter from './routes/sessions.router.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/sessions", sessionRouter);

export default app;
