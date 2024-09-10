import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    req.session.login = true;

    const token = jwt.sign({ usuario: req.user.first_name, rol: req.user.age }, "backendDos", { expiresIn: "1h" });

    res.cookie("tokenCookie", token, {
        maxAge: 3600000,
        httpOnly: true
    })

    res.redirect("/api/sessions/profile");
}

export const login = async (req, res) => {
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    req.session.login = true;

    res.redirect("/api/sessions/profile");
}

export const logout = (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/");
}

export const failed = (req, res) => {
    res.render("failed");
}

export const current = (req, res) => {
    if (req.user) {
        res.render("home", { usuario: req.user.usuario });
    } else {
        res.status(401).send("No autorizado");
    }
}

export const githubCallback = async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/api/sessions/profile");
}
