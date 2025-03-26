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

export default creatureController;