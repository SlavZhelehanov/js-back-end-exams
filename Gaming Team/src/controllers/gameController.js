import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import gameService from "../services/gameService.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";
import { getTypeOfPlatform } from "../util/getTypeOfPlatform.js";

const gameController = Router();

// CATALOG
gameController.get("/", async (req, res) => {
    return res.render("game/catalog");
});

// CREATE
gameController.get("/create", isUser, (req, res) => {
    const types = getTypeOfPlatform();

    return res.render("game/create", { types });
});
gameController.post("/create", isUser, async (req, res) => {
    const { name, platform, image, price, description, genre } = req.body;

    try {
        await gameService.createGame({ name, platform, image, price, description, genre, owner: req.user.id });
        return res.redirect("/games");
    } catch (error) {
        const types = getTypeOfPlatform(platform);
        return res.render("game/create", { messages: parseErrorMessage(error), types, name, image, price, description, genre });
    }
});

// DETAILS
gameController.get("/:id/details", async (req, res) => {
    return res.render("game/details");
});

// EDIT
gameController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("game/edit");
});

// SEARCH
gameController.get("/search", async (req, res) => {
    return res.render("game/search");
});

export default gameController;