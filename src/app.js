import express from 'express';
import displayRoutes from 'express-routemap';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/view.routes.js';
import "./database.js"

const app = express();
const port = 8080;

// Middleware //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Express Handlebars //
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Rutas //
app.use('/', productsRouter);
app.use('/', cartsRouter);
app.use('/', viewsRouter);

// Servidor //
const httpServer = app.listen(port, () => {
  displayRoutes(app)
  console.log(`Servidor escuchando en http://localhost:${port}`);
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