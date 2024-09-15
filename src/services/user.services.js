import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

class UserService {
    async registerUser(userData) {
        const userExists = await UserRepository.getUserByEmail(userData.email); 
        if(userExists) throw new Error("El e-mail ingresado ya existe"); 

        const newCart = await CartRepository.createcart(); 

        userData.cart = newCart._id;
        userData.password = createHash(userData.password); 
        return await UserRepository.createUser(userData); 
    }

    async loginUser(email, password) {
        const user = await UserRepository.getUserByEmail(email); 
        if(!user || !isValidPassword(password, user)) throw new Error("Datos ingresados incorrectos");
        return user; 
    }
}

export default new UserService(); 