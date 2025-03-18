import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";

const stoneController = Router();

// CREATE
stoneController.get("/create", isUser, (req, res) => {
    return res.render("stone/create");
});

// DASHBOARD
stoneController.get("/", async (req, res) => {
    return res.render("stone/dashboard");
});

export default stoneController;