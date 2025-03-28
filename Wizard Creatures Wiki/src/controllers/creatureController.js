import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import creatureService from "../services/creatureService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";

const creatureController = Router();

// CATALOG
creatureController.get("/", async (req, res) => {
    return res.render("creature/catalog");
});

// CREATE
creatureController.get("/create", isUser, (req, res) => {
    return res.render("creature/create");
});
creatureController.post("/create", isUser, async (req, res) => {
    const { name, species, skinColor, eyeColor, image, description } = req.body;

    try {
        await creatureService.createCreature({ name, species, skinColor, eyeColor, image, description, owner: req.user.id });
        return res.redirect("/creatures");
    } catch (error) {
        return res.render("creature/create", { messages: parseErrorMessage(error), name, species, skinColor, eyeColor, image, description });
    }
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