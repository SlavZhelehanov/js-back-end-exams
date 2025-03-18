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

// DETAILS
stoneController.get("/:id/details", async (req, res) => {
    return res.render("stone/details");
});

// EDIT
stoneController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("stone/edit");
});

export default stoneController;