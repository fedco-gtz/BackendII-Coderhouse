import express from "express";
const router = express.Router();
import passport from "passport";
import userController from "../controllers/user.controller.js";

router.post("/register", passport.authenticate("register", { failureRedirect: "failed" }), userController.register);

router.post("/login", passport.authenticate("login", { failureRedirect: "failed" }), userController.login);

router.get("/logout", userController.logout);

router.get("/failed", userController.failed);

router.get("/current", passport.authenticate("jwt", { session: false }), userController.current);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), (req, res) => {});

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), userController.githubCallback);

export default router;

/* 


router.get('/current', passport.authenticate('jwt', { session: false }), userController.current);



export default router;
*/