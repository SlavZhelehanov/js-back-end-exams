import { Router } from "express";

import cosmeticService from "../services/cosmeticService.js";
import { parseErrorMessage } from "../util/parseErrorMessage.js";

const cosmeticController = Router();


// CATALOG
cosmeticController.get("/", async (req, res) => {
    try {
        const cosmetics = await cosmeticService.getAllcosmetics();
        return console.log(cosmetics);
        
        return res.render("cosmetic/catalog", { cosmetics });
    } catch (error) {
        return res.render("cosmetics/catalog", { messages: parseErrorMessage(error) });
    }
});

// CREATE
cosmeticController.get("/create", (req, res) => {
    return res.render("cosmetics/create");
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