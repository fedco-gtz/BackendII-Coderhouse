import productModel from '../dao/models/product.model.js';

class ProductDao {
    async create(productData) {
        const product = new productModel(productData);
        return await product.save();
    }

    async findAll(filter = {}, options = {}) {
        return await productModel.paginate(filter, options);
    }

    async findById(productId) {
        return await productModel.findById(productId);
    }

    async update(productId, updateData) {
        return await productModel.findByIdAndUpdate(productId, updateData, { new: true });
    }

    async delete(productId) {
        return await productModel.findByIdAndDelete(productId);
    }
}

export default new ProductDao();