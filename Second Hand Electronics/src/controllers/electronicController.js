import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";

const electronicController = Router();

// CATALOG
electronicController.get("/", async (req, res) => {
    return res.render("electronic/catalog");
});

// CREATE
electronicController.get("/create", isUser, (req, res) => {
    return res.render("electronic/create");
});

// DETAILS
electronicController.get("/:id/details", async (req, res) => {
    return res.render("electronic/details");
});

// EDIT
electronicController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("electronic/edit");
});

export default electronicController;