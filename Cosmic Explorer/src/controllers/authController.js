import { Router } from "express";

const authController = Router();

// REGISTER
authController.get("/register", (req, res) => {
    return res.render("auth/register");
});

export default authController;