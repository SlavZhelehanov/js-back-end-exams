import { Router } from "express";

import cosmeticService from "../services/cosmeticService.js";
import { parseErrorMessage } from "../util/parseErrorMessage.js";

const cosmeticController = Router();


// CATALOG
cosmeticController.get("/", async (req, res) => {
    try {
        const cosmetics = await cosmeticService.getAllCosmetics();

        return res.render("cosmetics/catalog", { cosmetics });
    } catch (error) {
        return res.render("cosmetics/catalog", { messages: parseErrorMessage(error) });
    }
});

// CREATE
cosmeticController.get("/create", (req, res) => {
    return res.render("cosmetics/create");
});
cosmeticController.post("/create", async (req, res) => {
    const { name, skin, description, ingredients, benefits, price, image } = req.body;

    try {
        await cosmeticService.createCosmetic({ name, skin, description, ingredients, benefits, price, image, owner: req.user.id });
        return res.redirect("/cosmetics");
    } catch (error) {
        return res.render("cosmetics/create", { messages: parseErrorMessage(error), cosmetic: { name, skin, description, ingredients, benefits, price, image } });
    }
});

// DETAILS
cosmeticController.get("/:id/details", (req, res) => {
    return res.render("cosmetics/details");
});

// EDIT
cosmeticController.get("/:id/edit", (req, res) => {
    return res.render("cosmetics/edit");
});

// SEARCH
cosmeticController.get("/search", (req, res) => {
    return res.render("cosmetics/search");
});

export default cosmeticController;