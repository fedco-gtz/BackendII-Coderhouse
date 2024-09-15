import cartRepository from '../repositories/cart.repository.js';
import CartDto from '../dto/cart.dto.js';
import productRepository from '../repositories/product.repository.js';
/*import TicketService from './ticketService.js';
import TicketDTO from '../dto/ticketDTO.js'; */

class CartService {
    async getCartById(cartId) {
        const cart = await cartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        return new CartDto(cart);
    }

    async addProductToCart(cartId, productId) {
        const cart = await cartRepository.getCartById(cartId);
        const product = await productRepository.getProductById(productId);

        if (!cart || !product) {
            throw new Error('Cart or Product not found');
        }

        const productIndex = cart.products.findIndex(p => p.product._id.equals(productId));

        if (productIndex === -1) {
            cart.products.push({ product: productId, quantity: 1 });
        } else {
            cart.products[productIndex].quantity += 1;
        }

        const updatedCart = await cartRepository.updateCart(cartId, cart);
        return new CartDto(updatedCart);
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await cartRepository.getCartById(cartId);

        if (!cart) {
            throw new Error('Cart not found');
        }

        const productIndex = cart.products.findIndex(p => p.product._id.equals(productId));

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            const updatedCart = await cartRepository.updateCart(cartId, cart);
            return new CartDto(updatedCart);
        } else {
            throw new Error('Product not found in cart');
        }
    }

    async purchaseCart(cartId, userEmail) {
        const cart = await cartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        let totalAmount = 0;
        const productsOutOfStock = [];
        const productsPurchased = [];

        for (const item of cart.products) {
            const product = await productRepository.getProductById(item.product._id);
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                totalAmount += product.price * item.quantity;
                productsPurchased.push({ product, quantity: item.quantity });
                await productRepository.updateProduct(product._id, { stock: product.stock });
            } else if (product.stock > 0) {
                totalAmount += product.price * product.stock;
                productsPurchased.push({ product, quantity: product.stock });
                productsOutOfStock.push({ product, quantityUnavailable: item.quantity - product.stock });
                await productRepository.updateProduct(product._id, { stock: 0 });
            } else {
                productsOutOfStock.push({ product, quantityUnavailable: item.quantity });
            }
        }

        if (totalAmount > 0) {
            const ticket = await TicketService.createTicket(totalAmount, userEmail);

            cart.products = [];
            await cartRepository.updateCart(cartId, cart);

            return new TicketDTO(ticket, productsPurchased, productsOutOfStock);
        }

        throw new Error('No products available for purchase');
    }

    async clearCart(cartId) {
        const cart = await cartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.products = [];
        const updatedCart = await cartRepository.updateCart(cartId, cart);
        return new CartDto(updatedCart);
    }
}

export default new CartService();