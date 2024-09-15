import productRepository from '../repositories/product.repository.js';
import productDto from '../dto/product.dto.js';

class ProductService {
    async createProduct(productData) {
        const product = await productRepository.createProduct(productData);
        return new productDto(product);
    }

    async getProducts(filterOptions) {
        const products = await productRepository.getProducts(filterOptions);

        return {
            docs: products.docs.map(product => new productDto(product)),
            totalPages: products.totalPages,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
        };
    }

    async getProductById(productId) {
        const product = await productRepository.getProductById(productId);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return new productDto(product);
    }

    async updateProduct(productId, updateData) {
        const updatedProduct = await productRepository.updateProduct(productId, updateData);
        if (!updatedProduct) {
            throw new Error('Producto no encontrado');
        }
        return new productDto(updatedProduct);
    }

    async deleteProduct(productId) {
        const deletedProduct = await productRepository.deleteProduct(productId);
        if (!deletedProduct) {
            throw new Error('Producto no encontrado');
        }
        return new productDto(deletedProduct);
    }
}

export default new ProductService();