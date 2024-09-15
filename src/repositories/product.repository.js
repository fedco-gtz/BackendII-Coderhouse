import ProductDao from '../dao/product.dao.js';

class productRepository {
  async createProduct(productData) {
    return await ProductDao.create(productData);
  }

  async getProducts(filterOptions) {
    const { limit = 10, page = 1, sort, query } = filterOptions;
    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : null,
    };
    const queryObj = query ? { $or: [{ category: query }, { status: query }] } : {};
    return await ProductDao.findAll(queryObj, options);
  }

  async getProductById(productId) {
    return await ProductDao.findById(productId);
  }

  async updateProduct(productId, updateData) {
    return await ProductDao.update(productId, updateData);
  }

  async deleteProduct(productId) {
    return await ProductDao.delete(productId);
  }
}

export default new productRepository();