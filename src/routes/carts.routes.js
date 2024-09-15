import express from 'express';
import passport from 'passport';
import { addProductToCart, removeProductFromCart, purchaseCart } from '../controllers/carts.controller.js';

const router = express.Router();

router.post('/add-product', passport.authenticate('jwt', { session: false }), addProductToCart);
router.delete('/remove-product', passport.authenticate('jwt', { session: false }), removeProductFromCart);
router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), purchaseCart);

export default router;