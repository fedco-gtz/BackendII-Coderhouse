import mongoose from "mongoose";
import configObject from "./config/config.js";

const { MONGO_URL } = configObject

mongoose.connect(MONGO_URL)
    .then(() => console.log("Base de datos conectada correctamente"))
    .catch((error) => console.log("Hay algun error", error))