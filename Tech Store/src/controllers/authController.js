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
    const { name, email, password, rePassword } = req.body;

    try {
        let user = await authService.findOneUser({ email });

        if (user) throw ["This email is already registered"];

        user = await authService.createUser({ name, email, password, rePassword });
        const token = await jwt.sign({ id: user.id }, SUPER_SECRET, { expiresIn: "2h" });

        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        return res.redirect("/devices");
    } catch (error) {
        return res.render("auth/register", { name, email, messages: parseErrorMessage(error) });
    }
});

// LOGIN
authController.get("/login", isGuest, (req, res) => {
    return res.render("auth/login");
});
authController.post("/login", isGuest, async (req, res) => {
    const { name, password } = req.body;

    try {
        let user = await authService.findOneUser({ name });

        if (!user) throw ["Wrong name or password!"];

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) throw ["Wrong name or password!"];

        const token = await jwt.sign({ id: user.id }, SUPER_SECRET, { expiresIn: "2h" });

        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        return res.redirect("/planets");
    } catch (error) {
        return res.render("auth/login", { name, messages: parseErrorMessage(error) });
    }
});

// LOGOUT
authController.get("/logout", isUser, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    return res.redirect("/");
});

export default authController;