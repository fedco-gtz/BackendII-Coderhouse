import userService from "../services/user.services.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

class UserController {
    async register(req, res) {
        const {first_name, last_name, email, age, password} = req.body; 

        try {
            const newUser = await userService.registerUser({first_name, last_name, email, age, password}); 

            const token = jwt.sign({
                usuario: `${newUser.first_name} ${newUser.last_name}`,
                email: newUser.email,
                role: newUser.role
            }, "backendDos", {expiresIn: "1h"});

            res.cookie("tokenCookie", token, {maxAge: 3600000, httpOnly: true});
            req.session.user = req.user;
            req.session.login = true;
            res.redirect("/api/sessions/profile");
        } catch (error) {
            res.status(500).send("Error del servidor");
        }
    }

    async login(req, res) {
        const {email, password} = req.body; 

        try {
            const user = await userService.loginUser(email, password);

            const token = jwt.sign({
                usuario: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role
            }, "backendDos", {expiresIn: "1h"});

            res.cookie("tokenCookie", token, {maxAge: 3600000, httpOnly: true});
            req.session.user = req.user;
            req.session.login = true;
            res.redirect("/api/sessions/profile");
        } catch (error) {
            res.status(500).send("Error del servidor");
        }
    }

    async current(req, res) {
        if(req.user) {
            const user = req.user; 
            const userDTO = new UserDTO(user); 
            res.render("profile", {user: userDTO})
        } else {
            res.send("No autorizado");
        }
    }

    async failed(req, res) {
        res.render("failed");
    }

    async githubCallback(req, res) {
        req.session.user = req.user;
        req.session.login = true;
        res.redirect("/api/sessions/profile");
    }

    logout(req, res) {
        res.clearCookie("tokenCookie");
        res.clearCookie("connect.sid")
        res.redirect("/");
    }
}

export default new UserController(); 

