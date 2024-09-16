import ProductManager from '../dao/factory.js';
import CartManager from "../dao/db/cartManagerDb.js";
import configObject from '../config/config.js';

const productManager = new ProductManager();
const cartManager = new CartManager();

export const renderHome = (req, res) => {
    res.render('home');
};

export const renderRealTimeProducts = async (req, res) => {
    try {
        const productos = await productManager.getProductsTotal();
        const nuevoArray = productos.map(producto => {
            const { _id, ...rest } = producto.toObject();
            return { _id, ...rest };
        });
        res.render("realtimeproducts", { productos: nuevoArray, isRegisterPage: true, user: req.session.user });
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({ status: 'error', error: "Error interno del servidor" });
    }
};

export const renderProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'asc', query } = req.query;
        const productos = await productManager.getProducts({
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort,
            query: query
        });
        const nuevoArray = productos.docs.map(producto => {
            const { _id, ...rest } = producto.toObject();
            return { _id, ...rest };
        });
        res.render("products", {
            productos: nuevoArray,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            currentPage: productos.page,
            totalPages: productos.totalPages,
            isRegisterPage: true, 
            user: req.session.user
        });
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({ status: 'error', error: "Error interno del servidor" });
    }
};

export const renderProductDetails = async (req, res) => {
    const id = req.params.pid;
    try {
        const producto = await productManager.getProductById(id);
        if (producto) {
            return res.render("productDetails", producto);
        } else {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener producto", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const renderCart = (req, res) => {
    const cartId = req.params.cid;
    res.render('carts', { cartId , isRegisterPage: true, user: req.session.user });
};

export const renderRegister = (req, res) => {
    if (req.session.login) {
        return res.redirect("/profile");
    }
    res.render("register", { isRegisterPage: true });
};

export const renderLogin = (req, res) => {
    if (req.session.login) {
        return res.redirect("/profile");
    }
    res.render("login", { isRegisterPage: true });
};

export const renderProfile = (req, res) => {
    if (!req.session.login) {
        return res.redirect("/login");
    }
    res.render("profile", { isRegisterPage: true, user: req.session.user });
};