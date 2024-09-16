import express from 'express';
import displayRoutes from 'express-routemap';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/view.routes.js';
import sessionsRouter from './routes/sessions.routes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport.config.js';
import configObject from './config/config.js';
import passport from 'passport';
import cors from 'cors';
import productRepository from './repositories/product.repository.js';
import cartRepository from './repositories/cart.repository.js';
import './database.js'

const app = express();
const fileStore = FileStore(session);
const { PORT, MONGO_URL } = configObject

// Middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
  secret: "fedeCoder",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://gutierrezfedericog:ZGu2Q70OsMrmWJL9@cluster0.yex3ufx.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  })
}));
app.use(passport.initialize()); 
initializePassport(); 
app.use(passport.session());
app.use(cors());

// Express Handlebars //
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Rutas //
app.use('/', productsRouter);
app.use('/', cartsRouter);
app.use('/', viewsRouter);
app.use ('/api/sessions/', sessionsRouter);

// Servidor //
const httpServer = app.listen(PORT, () => {
  displayRoutes(app)
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});