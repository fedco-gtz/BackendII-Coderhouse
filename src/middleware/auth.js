export function onlyAdmin(req, res, next) {
    if(req.user.role === "admin") {
        next(); 
    } else {
        res.status(403).send("No tenes acceso a las funciones de administrador del sitio"); 
    }
}

export function onlyUser(req, res, next) {
    if(req.user.role === "user") {
        next(); 
    } else {
        res.status(403).send("No tenes acceso a la tienda");
    }
}