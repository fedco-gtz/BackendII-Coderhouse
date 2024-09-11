import { promises as fs } from "fs";
import productModel from "./models/product.model.js";

const path = './data/products.json';

class ProductManager {
    constructor(path) {
        if (typeof path !== 'string' || path.trim() === '') {
            throw new Error('El valor del path debe ser una cadena no vacía.');
        }
        this.products = [];
        this.path = path;
    }

    async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {
        try {
            const arrayProducts = await this.readFile();

            if (!title || !description || !price || !code || !stock || !category) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            if (arrayProducts.some(item => item.code === code)) {
                console.log("El código del producto debe ser único");
                return;
            }

            let newId;
            do {
                newId = Math.floor(10000 + Math.random() * 90000).toString();
            } while (arrayProducts.some(item => item.id === newId));

            const newProduct = {
                id: newId,
                title: title.toUpperCase(),
                description,
                price,
                img,
                code,
                stock,
                category,
                status: true,
                thumbnails: thumbnails || []
            };

            arrayProducts.push(newProduct);
            await this.saveFile(arrayProducts);
            console.log("Producto agregado correctamente");
        } catch (error) {
            console.log("Error al agregar producto", error);
            throw error;
        }
    }

    async getProducts() {
        try {
            const arrayProducts = await this.readFile();
            return arrayProducts;
        } catch (error) {
            console.log("Error al leer el archivo", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.readFile();
            const search = arrayProducts.find(item => item.id === id);

            if (!search) {
                console.log("Producto no encontrado");
                return null;
            } else {
                console.log("Producto encontrado");
                return search;
            }
        } catch (error) {
            console.log("Error al leer el archivo", error);
            throw error;
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const arrayProducts = await this.readFile();

            const index = arrayProducts.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProducts[index] = { ...arrayProducts[index], ...productoActualizado };
                await this.saveFile(arrayProducts);
                console.log("Producto actualizado");
            } else {
                console.log("No se encontró el producto");
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProducts = await this.readFile();

            const index = arrayProducts.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProducts.splice(index, 1);
                await this.saveFile(arrayProducts);
                console.log("Producto eliminado");
            } else {
                console.log("No se encontró el producto");
            }
        } catch (error) {
            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }

    async readFile(path = this.path) {
        if (typeof path !== 'string' || !path) {
            throw new TypeError('El argumento "path" debe ser una cadena no vacía.');
        }
        try {
            const respuesta = await fs.readFile(path, "utf-8");
            const arrayProducts = JSON.parse(respuesta);
            return arrayProducts;
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            }
            console.log("Error al leer el archivo", error);
            throw error;
        }
    }

    async saveFile(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
            throw error;
        }
    }

    async getProductsTotal() {
        try {
            const productos = await productModel.find();
            return productos;
        } catch (error) {
            console.log("Error al obtener los productos", error);
            throw error;
        }
    }
}

export default ProductManager;
