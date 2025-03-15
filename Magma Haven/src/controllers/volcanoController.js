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

export default volcanoController;