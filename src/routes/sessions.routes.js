import express from "express";
const router = express.Router();
import passport from "passport";
import * as sessionsController from "../controllers/sessions.controller.js";

router.post("/register", passport.authenticate("register", {
    failureRedirect: "failed"
}), sessionsController.register);

router.post("/login", passport.authenticate("login", {
    failureRedirect: "failed"
}), sessionsController.login);

router.get("/logout", sessionsController.logout);

router.get("/failed", sessionsController.failed);

router.get("/current", passport.authenticate("jwt", { session: false }), sessionsController.current);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), (req, res) => {});

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), sessionsController.githubCallback);

export default router;
