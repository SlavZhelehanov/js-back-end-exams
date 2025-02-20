import { Router } from "express";

const authController = Router();

// REGISTER
authController.get("/register", (req, res) => {
    return res.render("auth/register");
});

// LOGIN
authController.get("/login", (req, res) => {
    return res.render("auth/login");
});

export default authController;