import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import stoneService from "../services/stoneService.js";
import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const stoneController = Router();

// CREATE
stoneController.get("/create", isUser, (req, res) => {
    return res.render("stone/create");
});
stoneController.post("/create", isUser, async (req, res) => {
    const { name, category, color, image, location, formula, description } = req.body;

    try {
        await stoneService.createStone({ name, category, color, image, location, formula, description, owner: req.user.id });
        return res.redirect("/stones");
    } catch (error) {
        return res.render("stone/create", { messages: parseErrorMessage(error), name, category, color, image, location, formula, description });
    }
});

// DASHBOARD
stoneController.get("/", async (req, res) => {
    try {
        const stones = await stoneService.getAllStones();

        return res.render("stone/dashboard", { stones });
    } catch (error) {
        return res.render("stone/dashboard", { messages: parseErrorMessage(error) });
    }
});

// DETAILS
stoneController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const stone = await stoneService.getOneStone({ _id: req.params.id });

        if (!stone) return res.redirect("/404");

        const isOwner = stone.owner.equals(req.user?.id);
        const isLiked = req.user && !isOwner && stone.likedList.some(id => id.equals(req.user.id));

        return res.render("stone/details", { stone, isOwner, isLiked });
    } catch (error) {
        return res.render("stone/details", { messages: parseErrorMessage(error) });
    }
});

// LIKE
stoneController.get("/:id/like", isUser, isValidId, async (req, res) => {
    let stone;

    try {
        stone = await stoneService.getOneStone({ _id: req.params.id });

        if (!stone || !req.user || stone.owner.equals(req.user.id) || stone.likedList.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await stoneService.likeToStone(req.params.id, req.user.id);

        return res.redirect(`/stones/${req.params.id}/details`);
    } catch (error) {
        return res.render("stone/details", { messages: parseErrorMessage(error), stone, isOwner: stone && stone.owner.equals(req.user?.id), isLiked: stone && req.user && !stone.owner.equals(req.user?.id) && stone.likedList.some(id => id.equals(req.user.id)) });
    }
});

// DELETE
stoneController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const query = await stoneService.deleteOneStone(req.params.id, req.user.id);

        if (!query) return res.redirect("/404");

        return res.redirect("/stones");
    } catch (error) {
        return res.render("stone/details", { messages: parseErrorMessage(error), stone, isOwner: stone && stone.owner.equals(req.user?.id), isLiked: stone && req.user && !stone.owner.equals(req.user?.id) && stone.likedList.some(id => id.equals(req.user.id)) });
    }
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