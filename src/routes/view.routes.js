import { Router } from 'express';
import { renderHome, renderRealTimeProducts, renderProducts, renderProductDetails, renderCart, renderRegister, renderLogin, renderProfile } from '../controllers/view.controller.js';

const router = Router();

// Ruta para hacer funcional home.handelbars
router.get("/", renderHome);

// Ruta para hacer funcional realTimeProducts.handelbars
router.get('/realtimeproducts', renderRealTimeProducts);

// Rutas para hacer funcional products.handelbars
router.get("/products", renderProducts);

router.get("/products/:pid", renderProductDetails);

// Rutas para hacer funcional cart.handelbars
router.get("/carts/:cid", renderCart);

// Ruta para registrar usuarios
router.get("/api/sessions/register", renderRegister);

// Ruta para iniciar sesión
router.get("/api/sessions/login", renderLogin);

// Ruta para ver el perfil
router.get("/api/sessions/profile", renderProfile);

export default router;
