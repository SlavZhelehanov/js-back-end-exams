import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import stoneService from "../services/stoneService.js";
import { parseErrorMessage } from "../util/parseErrorMessage.js";

const stoneController = Router();

// CREATE
stoneController.get("/create", isUser, (req, res) => {
    return res.render("stone/create");
});
stoneController.post("/create", isUser, async (req, res) => {
    const { name, category, color, image, location, formula, description } = req.body;

    try {
        await stoneService.createStone({ name, category, color, image, location, formula, description, owner: req.user.id });
        return res.redirect("/dashboard");
    } catch (error) {
        return res.render("stone/create", { messages: parseErrorMessage(error), name, category, color, image, location, formula, description });
    }
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

// SEARCH
stoneController.get("/search", async (req, res) => {
    return res.render("stone/search");
});

export default stoneController;