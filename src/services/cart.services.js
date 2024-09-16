import cartRepository from '../repositories/cart.repository.js';
import CartDto from '../dto/cart.dto.js';
import productRepository from '../repositories/product.repository.js';
import ticketDto from '../dto/ticket.dto.js';
import TicketService from './ticket.service.js';

class CartService {
    async getCartById(cartId) {
        const cart = await cartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        return new CartDto(cart);
    }

    async addProductToCart(cartId, productId) {
        const cart = await cartRepository.getCartById(cartId);
        const product = await productRepository.getProductById(productId);

        if (!cart || !product) {
            throw new Error('Carrito o Producto no encontrado');
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
            throw new Error('Carrito no encontrado');
        }

        const productIndex = cart.products.findIndex(p => p.product._id.equals(productId));

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            const updatedCart = await cartRepository.updateCart(cartId, cart);
            return new CartDto(updatedCart);
        } else {
            throw new Error('Producto no encontrado en el carrito');
        }
    }

    async purchaseCart(cartId, userEmail) {
        const cart = await cartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
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

            return new ticketDto(ticket, productsPurchased, productsOutOfStock);
        }

        throw new Error('No hay productos disponibles para comprar');
    }

    async clearCart(cartId) {
        const cart = await cartRepository.getCartById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.products = [];
        const updatedCart = await cartRepository.updateCart(cartId, cart);
        return new CartDto(updatedCart);
    }
}

export default new CartService();