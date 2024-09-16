import express from 'express';
import passport from 'passport';
import { addProductToCart, removeProductFromCart, purchaseCart } from '../controllers/carts.controller.js';
import { renderCart } from '../controllers/view.controller.js';

const router = express.Router();

router.get('/carts/:cid', renderCart);
router.get('/carts/:cid/purchase', purchaseCart);
router.post('/carts/:cid/purchase', purchaseCart);

router.post('/add-product', passport.authenticate('jwt', { session: false }), addProductToCart);
router.delete('/remove-product', passport.authenticate('jwt', { session: false }), removeProductFromCart);

export default router;