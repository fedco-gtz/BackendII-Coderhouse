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
import passport from "passport";
import "./database.js"

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

import ProductManager from './dao/db/productManagerDb.js';
const productManager = new ProductManager('./dao/fs/data/products.json');
import CartManager from './dao/db/cartManagerDb.js';
const cartManager = new CartManager('./dao/fs/data/cart.json');
const io = new Server(httpServer); 

io.on('connection', (socket) => {
  console.log('Cliente Conectado');

  const sendProducts = async () => {
      const productsData = await productManager.getProducts();
      io.emit('products', productsData.docs);
  };

  sendProducts();

  socket.on('addProduct', async (producto) => {
    try {
        await productManager.addProduct(producto);
        sendProducts();
    } catch (error) {
        console.error('Error al agregar producto:', error);
    }
});

  socket.on('removeProduct', async (id) => {
      await productManager.deleteProduct(id);
      sendProducts();
  });

  socket.on('disconnect', () => {
      console.log('Cliente Desconectado');
  });
});