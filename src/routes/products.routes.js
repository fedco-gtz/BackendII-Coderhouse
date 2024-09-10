import express from "express";
import { getProductById, getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

// Método GET para visualizar los productos por ID
router.get("/api/products/:pid", getProductById);

// Método GET para visualizar todos los productos con paginación, filtrado y ordenamiento
router.get("/api/products", getProducts);

// Método POST para agregar un nuevo producto
router.post("/api/products", addProduct);

// Método PUT para actualizar un producto por ID
router.put("/api/products/:pid", updateProduct);

// Método DELETE para eliminar un producto por ID
router.delete("/api/products/:pid", deleteProduct);

export default router;
