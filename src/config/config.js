import dotenv from "dotenv"; 

import program from "../utils/commander.js"; 
const { mode } = program.opts(); 

dotenv.config({
    path: mode === "desarrollo" ? "./.env.desarrollo" : "./.env.produccion"
}); 

const configObject = {
    PORT: process.env.PORT, 
    MONGO_URL: process.env.MONGO_URL
}

export default configObject; 