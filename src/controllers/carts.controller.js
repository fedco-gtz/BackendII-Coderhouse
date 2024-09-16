import CartService from '../services/cart.services.js';

export const addProductToCart = async (req, res) => {
  try {
    const cart = await CartService.addProductToCart(req.user.cart, req.body.productId);
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const cart = await CartService.removeProductFromCart(req.user.cart, req.body.productId);
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const ticketDto = await CartService.purchaseCart(req.user.cart, req.user.email);
    res.render('ticket', { ticket: ticketDto, user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await CartService.clearCart(req.user.cart);
    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};