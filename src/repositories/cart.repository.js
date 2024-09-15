import CartDao from "../dao/cart.dao.js";

class CartRepository {
    async createcart() {
        return await CartDao.create();
    }

    async getCartById(cartId) {
        return await CartDao.getById(cartId);
    }

    async addProductToCart(cartId, productId) {
        return await CartDao.addProductToCart(cartId, productId);
    }

    async removeProductFromCart(cartId, productId) {
        return await CartDao.removeProductFromCart(cartId, productId);
    }

    async updateCart(cartId, cartData) {
        return await CartDao.update(cartId, cartData);
    }

    async clearCart(cartId) {
        return await CartDao.clearCart(cartId);
    }
}

export default new CartRepository();