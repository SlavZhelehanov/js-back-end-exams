import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";

const volcanoController = Router();

// CATALOG
volcanoController.get("/", async (req, res) => {
    return res.render("volcano/catalog");
});

// CREATE
volcanoController.get("/create", isUser, (req, res) => {
    return res.render("volcano/create");
});

// DETAILS
volcanoController.get("/:id/details", async (req, res) => {
    return res.render("volcano/details");
});

// EDIT
volcanoController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("volcano/edit");
});

export default volcanoController;