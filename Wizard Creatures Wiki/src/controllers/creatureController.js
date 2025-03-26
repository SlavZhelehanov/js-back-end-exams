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

export default creatureController;