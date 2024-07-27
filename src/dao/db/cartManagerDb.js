import cartModel from "../models/cart.model.js";

class CartManager {
    async createCart() {
        try {
            const newCart = new cartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error("Error al crear carrito", error);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error(`No existe un carrito con el id ${cartId}`);
            }
            return cart;
        } catch (error) {
            console.error("Error al obtener el carrito por ID", error);
            throw error;
        }
    }

    async getAllCarts() {
        try {
            const carts = await cartModel.find();
            return carts;
        } catch (error) {
            console.error('Error al obtener todos los carritos:', error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId);
            if (!cart) {
                throw new Error(`No existe un carrito con el id ${cartId}`);
            }
            
            const existsProduct = cart.products.find(item => item.product.toString() === productId);
            if (existsProduct) {
                existsProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error al agregar producto al carrito", error);
            throw error;
        }
    }

    async emptyCart(cartId) {
        try {
            const cart = await this.getCartById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al vaciar el carrito', error);
            throw error;
        }
    }

    async updateCart(cartId, updatedProducts) {
        try {
            const cart = await cartModel.findById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = updatedProducts;

            cart.markModified('products');

            await cart.save();

            return cart;
        } catch (error) {
            console.error('Error al actualizar el carrito en el gestor', error);
            throw error;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await cartModel.findById(cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = cart.products.filter(item => item.product._id.toString() !== productId);

            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al eliminar el producto del carrito en el gestor', error);
            throw error;
        }
    }

    async updateProductQuantity(cartId, productId, newQuantity) {
        try {
            const cart = await cartModel.findById(cartId);
    
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
    
            const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);
    
            if (productIndex !== -1) {
                cart.products[productIndex].quantity = newQuantity;
    
    
                cart.markModified('products');
    
                await cart.save();
                return cart;
            } else {
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito', error);
            throw error;
        }
    }
}

export default CartManager;