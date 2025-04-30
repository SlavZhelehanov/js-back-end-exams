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
    const { firstName, lastName, email, password, rePassword } = req.body;

    try {
        const user = await authService.register({ firstName, lastName, email, password, rePassword });
        const token = await jwt.sign({ id: user.id, email }, SUPER_SECRET, { expiresIn: "2h" });

        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        return res.redirect("/");
    } catch (error) {
        return res.render("auth/register", { firstName, lastName, email, messages: parseErrorMessage(error) });
    }
});

// LOGIN
authController.get("/login", isGuest, (req, res) => {
    return res.render("auth/login");
});
authController.post("/login", isGuest, async (req, res) => {
    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();

    try {
        const user = await authService.login({ email, password });
        const token = await jwt.sign({ id: user.id, email }, SUPER_SECRET, { expiresIn: "2h" });

        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        return res.redirect("/");
    } catch (error) {
        return res.render("auth/login", { email, messages: parseErrorMessage(error) });
    }
});

// LOGOUT
authController.get("/logout", isUser, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    return res.redirect("/");
});

export default authController;