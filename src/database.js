import mongoose from "mongoose";
import configObject from "./config/config.js";

const { MONGO_URL } = configObject

class Database {
    static #instance;
    constructor() {
        mongoose.connect(MONGO_URL);
    }

    static getInstance() {
        if (this.#instance) {
            console.log("Conexion previa a la base de datos");
            return this.#instance;
        }
        this.#instance = new Database();
        console.log("Conectado a la base de datos exitosamente");
        return this.#instance;
    }
}

export default Database.getInstance(); 