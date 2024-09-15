import express from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductForEdit } from "../controllers/product.controller.js";

const router = express.Router();

// Método GET para visualizar los productos por ID
// router.get("/api/products/:pid", getProductById);

// Método GET para visualizar todos los productos con paginación, filtrado y ordenamiento
router.get("/api/products", getAllProducts);

// Método POST para agregar un nuevo producto
router.post("/api/sessions/realtimeproducts", createProduct);

// Método PUT para actualizar un producto por ID
router.put("/api/products/:pid", updateProduct);

// Método DELETE para eliminar un producto por ID
router.delete("/api/sessions/realtimeproducts", deleteProduct);

export default router;

/*

import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductForEdit } from '../controllers/productController.js';


router.get('/', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), getAllProducts);

router.get('/create', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), (req, res) => {
  res.render('createProduct', { user: req.user });
});
router.post('/create', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), createProduct);
router.get('/edit/:pid', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), getProductForEdit);
router.post('/edit/:pid', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), updateProduct);
router.post('/delete/:pid', passport.authenticate('jwt', { session: false }), authorizeRole('admin'), deleteProduct);

*/