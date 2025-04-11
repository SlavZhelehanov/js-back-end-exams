import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import gameService from "../services/gameService.js";
import { isValidId } from "../middlewares/utlParamsMiddleware.js";
import { getTypeOfPlatform } from "../util/getTypeOfPlatform.js";

const gameController = Router();

// CATALOG
gameController.get("/", async (req, res) => {
    try {
        const games = await gameService.getAllGames();

        return res.render("game/catalog", { games });
    } catch (error) {
        return res.render("game/catalog", { messages: parseErrorMessage(error) });
    }
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
gameController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const game = await gameService.getOneGame({ _id: req.params.id }).lean();

        if (!game) return res.redirect("/404");

        const isOwner = game.owner.equals(req.user?.id);
        const isBought = req.user && !isOwner && game.boughtBy.some(id => id.equals(req.user.id));
        return res.render("game/details", { ...game, isOwner, isBought });
    } catch (error) {
        return res.render("game/details", { messages: parseErrorMessage(error) });
    }
});

// BUY
gameController.get("/:id/buy", isUser, isValidId, async (req, res) => {
    try {
        const game = await gameService.getOneGame({ _id: req.params.id });

        if (!game || game.owner.equals(req.user.id) || game.boughtBy.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await gameService.buyGame(req.params.id, req.user.id);

        return res.redirect(`/games/${req.params.id}/details`);
    } catch (error) {
        return res.render("game/details", { messages: parseErrorMessage(error) });
    }
});

// DELETE
gameController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const query = await gameService.deleteOneGame(req.params.id, req.user.id);

        if (!query) return res.redirect("/404");

        return res.redirect("/games");
    } catch (error) {
        return res.render("game/details", { messages: parseErrorMessage(error) });
    }
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