import CartDao from "../dao/cart.dao.js";

class CartRepository {
    async createcart() {
        return await CartDao.create();
    }

    //Aca le suman despues el resto de los metodos. 
}

export default new CartRepository();