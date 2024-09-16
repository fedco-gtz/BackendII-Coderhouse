import ProductService from "../services/product.service.js";

export const createProduct = async (req, res) => {
  try {
    const productDTO = await ProductService.createProduct(req.body);
    res.redirect('/api/sessions/realtimeproducts');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProductDTO = await ProductService.updateProduct(req.params.pid, req.body);
    if (!updatedProductDTO) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.redirect('');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.pid);
    res.redirect('/api/sessions/realtimeproducts');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const productsData = await ProductService.getProducts({ limit, page });

    res.render('adminProducts', {
      products: productsData.docs,
      totalPages: productsData.totalPages,
      page: productsData.page,
      hasPrevPage: productsData.hasPrevPage,
      hasNextPage: productsData.hasNextPage,
      prevPage: productsData.prevPage,
      nextPage: productsData.nextPage,
      user: req.user,
    });
  } catch (error) {
    res.status(500).render('error', { message: 'Error al cargar productos', error });
  }
};

export const getProductForEdit = async (req, res) => {
  try {
    const productDTO = await ProductService.getProductById(req.params.pid);
    res.render('editProduct', { product: productDTO, user: req.user });
  } catch (error) {
    res.status(500).render('error', { message: 'Error al cargar el producto para editarlo', error });
  }
};