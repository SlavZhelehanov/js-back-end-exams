import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";

const creatureController = Router();

// CATALOG
creatureController.get("/", async (req, res) => {
    return res.render("creature/catalog");
});

// CREATE
creatureController.get("/create", isUser, (req, res) => {
    return res.render("creature/create");
});

// DETAILS
creatureController.get("/:id/details", async (req, res) => {
    return res.render("creature/details");
});

// EDIT
creatureController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("creature/edit");
});

// PROFILE
creatureController.get("/profile", isUser, async (req, res) => {
    return res.render("creature/profile");
});

export default creatureController;