import { Router } from "express";

const authController = Router();

import authService from "../services/authService.js";
import jwt from "../lib/jsonwebtoken.js";
import { COOKIE_NAME, SUPER_SECRET } from "../util/envConstants.js";
import { isGuest, isUser } from "../middlewares/authMiddleware.js";
import parseErrorMessage from "../util/parseErrorMessage.js";


// REGISTER
authController.get("/register", isGuest, (req, res) => {
    return res.render("auth/register");
});
authController.post("/register", isGuest, async (req, res) => {
    const { email, password, rePassword } = req.body;

    try {
        let user = await authService.register({ email, password, rePassword });

        const token = await jwt.sign({ id: user.id }, SUPER_SECRET, { expiresIn: "2h" });

        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        return res.redirect("/");
    } catch (error) {
        return res.render("auth/register", { email, messages: parseErrorMessage(error) });
    }
});

// LOGIN
authController.get("/login", isGuest, (req, res) => {
    return res.render("auth/login");
});
authController.post("/login", isGuest, async (req, res) => {
    let { username, password } = req.body;

    username = username.trim();
    password = password.trim();

    try {
        const user = await authService.login({ username, password });
        const token = await jwt.sign({ id: user.id }, SUPER_SECRET, { expiresIn: "2h" });

        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        return res.redirect("/planets");
    } catch (error) {
        return res.render("auth/login", { username, messages: parseErrorMessage(error) });
    }
});

// LOGOUT
authController.get("/logout", isUser, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    return res.redirect("/");
});

export default authController;