import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import exphbs from 'express-handlebars';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import './config/passport.js';
import { initPassport } from './config/passport.js';
import sessionRouter from './routes/sessions.router.js';
import productRoutes from './routes/products.router.js';
import viewRoutes from './routes/view.router.js';
import cartRouter from './routes/cart.router.js';
import checkoutRouter from './routes/checkout.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const hbs = exphbs.create({
  helpers: {
    eq: (a, b) => a === b,
  },
});

dotenv.config();
initPassport();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(passport.initialize());
app.use((req, res, next) => { res.locals.currentPath = req.path; next();});
app.use("/api/sessions", sessionRouter);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/", viewRoutes);

export default app;