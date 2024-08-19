import { Router } from 'express';
import ProductManager from "../dao/db/productManagerDb.js";
import CartManager from "../dao/db/cartManagerDb.js";
const productManager = new ProductManager();
const cartManager = new CartManager();
const router = Router();

// Ruta para hacer funcional home.handelbars
router.get("/", async (req, res) => {
    res.render('home');
});

// Ruta para hacer funcional realTimeProducts.handelbars //VER ESTO
router.get('/realtimeproducts', async (req, res) => {
    try {
        const productos = await productManager.getProductsTotal();

        const nuevoArray = productos.map(producto => {
            const { _id, ...rest } = producto.toObject();
            return { _id, ...rest };
        });

        res.render("realtimeproducts", {
            productos: nuevoArray
        });

    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

// Rutas para hacer funcional products.handelbars
router.get("/products", async (req, res) => {
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
            totalPages: productos.totalPages
        });

    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

router.get("/products/:pid", async (req, res) => {
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
});

// Rutas para hacer funcional cart.handelbars
router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await cartManager.getCartById(cartId);

        if (!carrito) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        const productosEnCarrito = carrito.products.map(item => ({
            product: item.product.toObject(),
            quantity: item.quantity,
            total: item.quantity * item.product.toObject()
        }));


        res.render("carts", { productos: productosEnCarrito });
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para registrar usuarios
router.get("/api/sessions/register", (req, res) => {
    if (req.session.login) {
        return res.redirect("/profile");
    }
    res.render("register", { isRegisterPage: true });
})

// Ruta para iniciar sesión
router.get("/api/sessions/login", (req, res) => {
    if (req.session.login) {
        return res.redirect("/profile");
    }
    res.render("login", { isRegisterPage: true });
})

// Ruta para ver el perfil
router.get("/api/sessions/profile", (req, res) => {
    if (!req.session.login) {
        return res.redirect("/login");
    }
    res.render("profile", { isRegisterPage: true, user: req.session.user } );
})

export default router;