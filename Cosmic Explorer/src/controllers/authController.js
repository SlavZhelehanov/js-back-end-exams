import { Router } from "express";

const authController = Router();

import authService from "../services/authService.js";
import jwt from "../lib/jsonwebtoken.js";
import { COOKIE_NAME, SUPER_SECRET } from "../util/envConstants.js";

// REGISTER
authController.get("/register", (req, res) => {
    return res.render("auth/register");
});
authController.post("/register", isGuest, async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
        let user = await authService.findOneUser({ username });

        if (user) throw ["This username is already registered"];

        user = await authService.createUser({ username, email, password, rePassword });
        const token = await jwt.sign({ id: user.id }, SUPER_SECRET, { expiresIn: "2h" });

        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        return res.redirect("/planets");
    } catch (error) {
        return res.render("auth/register", { username, email, messages: [error] });
    }
});

// LOGIN
authController.get("/login", (req, res) => {
    return res.render("auth/login");
});
authController.post("/login", isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await authService.findOneUser({ username });

        if (!user) throw ["Wrong username or password!"];

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) throw ["Wrong username or password!"];

        const token = await jwt.sign({ id: user.id }, SUPER_SECRET, { expiresIn: "2h" });

        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        return res.redirect("/planets");
    } catch (error) {
        return res.render("auth/login", { username, messages: [error] });
    }
});

// LOGOUT
authController.get("/logout", isUser, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    return res.redirect("/");
});

export default authController;