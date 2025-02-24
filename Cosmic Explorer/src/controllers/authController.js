import { Router } from "express";

const authController = Router();

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

        return res.redirect("/planets");
    } catch (error) {
        return res.render("auth/register", { username, email, messages: [error] });
    }
});

// LOGIN
authController.get("/login", (req, res) => {
    return res.render("auth/login");
});

export default authController;