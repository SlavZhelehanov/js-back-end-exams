import { Router } from "express";
import jwt from "jsonwebtoken";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import authService from "../services/authService.js";
import { COOKIE_NAME, SUPER_SECRET } from "../util/envConstats.js";
import { isGuest, isUser } from "../middlewares/authMiddleware.js";

const authController = Router();

// AUTH
function generateToken(user) {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email
    }
    return jwt.sign(payload, SUPER_SECRET, { expiresIn: "2h" });
}

// REGISTER
authController.get("/register", isGuest, (req, res) => {
    return res.render("auth/register");
});

authController.post("/register", isGuest, async (req, res) => {
    const { name, email, password, rePassword } = req.body;

    try {
        const user = await authService.register({ name, email, password, rePassword });
        const token = generateToken(user);

        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        return res.redirect("/");
    } catch (error) {
        return res.render("auth/register", { name, email, messages: parseErrorMessage(error) });
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
        const token = generateToken(user);
        
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