import FileSystemProductsDAO from './fileSystemProductsDao.js';
import MongoDBProductsDAO from './mongoDbProductsDao.js';
import MemoryProductsDAO from './memoryProductsDao.js';
import config from '../config/config.js'

let DAO; 

switch(config.persistence) {
    case "mongo":
        DAO = MongoDBProductsDAO;
        break;
    case "memory":
        DAO = MemoryProductsDAO;
        break; 
    case "file":
        DAO = FileSystemProductsDAO;
        break;
    default: 
        throw new Error("Persistencia no valida"); 
}

export default DAO; 