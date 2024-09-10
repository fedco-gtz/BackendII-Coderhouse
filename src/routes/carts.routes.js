import express from 'express';
const router = express.Router();
import * as cartController from '../controllers/carts.controller.js';

// Método POST para crear el carrito de compras
router.post('/api/carts', cartController.createCart);

// Método GET para mostrar el carrito de compras
router.get('/api/carts', cartController.getAllCarts);

// Método GET para visualizar los productos del carrito por ID
router.get('/api/carts/:cid', cartController.getCartById);

// Método DELETE para eliminar un carrito por ID
router.delete('/api/carts/:cid', cartController.emptyCart);

// Método PUT para actualizar un carrito por ID
router.put('/api/carts/:cid', cartController.updateCart);

// Método POST para agregar un producto al carrito por ID de carrito y ID de producto
router.post('/api/carts/:cid/product/:pid', cartController.addProductToCart);

// Método DELETE para eliminar un producto al carrito por ID de carrito y ID de producto
router.delete('/api/carts/:cid/product/:pid', cartController.removeProductFromCart);

// Método PUT para actualizar la cantidad de un producto al carrito por ID de carrito y ID de producto
router.put('/api/carts/:cid/product/:pid', cartController.updateProductQuantity);

export default router;
