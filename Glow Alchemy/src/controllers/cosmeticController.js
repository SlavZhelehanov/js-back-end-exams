import { Router } from "express";

import cosmeticService from "../services/cosmeticService.js";
import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import { isValidId } from "../middlewares/utlParamsMiddleware.js";
import { validateQuery } from "../util/validateUrls.js";

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
cosmeticController.get("/create", isUser, (req, res) => {
    return res.render("cosmetics/create");
});
cosmeticController.post("/create", isUser, async (req, res) => {
    const { name, skin, description, ingredients, benefits, price, image } = req.body;

    try {
        await cosmeticService.createCosmetic({ name, skin, description, ingredients, benefits, price, image, owner: req.user.id });
        return res.redirect("/cosmetics");
    } catch (error) {
        return res.render("cosmetics/create", { messages: parseErrorMessage(error), cosmetic: { name, skin, description, ingredients, benefits, price, image } });
    }
});

// DETAILS
cosmeticController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const cosmetic = await cosmeticService.getOneCosmetic({ _id: req.params.id });

        if (!cosmetic) return res.redirect("/404");

        const isOwner = cosmetic.owner.equals(req.user?.id);
        const isRecommend = req.user && !isOwner && cosmetic.recommendList.some(id => id.equals(req.user.id));

        return res.render("cosmetics/details", { cosmetic, isOwner, isRecommend });
    } catch (error) {
        return res.render("cosmetics/details", { messages: parseErrorMessage(error) });
    }
});

// RECOMMEND
cosmeticController.get("/:id/recommend", isUser, isValidId, async (req, res) => {
    try {
        const cosmetic = await cosmeticService.getOneCosmetic({ _id: req.params.id });

        if (!cosmetic) return res.redirect("/404");

        if (!req.user || cosmetic.owner.equals(req.user.id) || cosmetic.recommendList.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await cosmeticService.recommendCosmetic(req.params.id, req.user.id);

        return res.redirect(`/cosmetics/${req.params.id}/details`);
    } catch (error) {
        return res.render("cosmetics/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
cosmeticController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const cosmetic = await cosmeticService.getOneCosmetic({ _id: req.params.id, owner: req.user?.id });

        if (!cosmetic) return res.redirect("/404");
        return res.render("cosmetics/edit", { cosmetic });
    } catch (error) {
        return res.render("cosmetics/edit", { messages: parseErrorMessage(error) });
    }
});
cosmeticController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const cosmetic = await cosmeticService.getOneCosmetic({ _id: req.params.id, owner: req.user?.id });

        if (!cosmetic) return res.redirect("/404");

        await cosmeticService.updateOneCosmetic(req.params.id, req.user.id, cosmetic, formData);

        return res.redirect(`/cosmetics/${req.params.id}/details`);
    } catch (error) {
        return res.render("cosmetics/edit", { cosmetic: formData, messages: parseErrorMessage(error) });
    }
});

// DELETE
cosmeticController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const query = await cosmeticService.deleteOneCosmetic(req.params.id, req.user.id);

        if (!query) return res.redirect("/404");

        return res.redirect("/cosmetics");
    } catch (error) {
        return res.render("cosmetics/details", { messages: parseErrorMessage(error) });
    }
});

// SEARCH
cosmeticController.get("/search", async (req, res) => {
    const search = req.query;

    try {
        const cosmetics = await cosmeticService.getAllCosmetics(search);

        return res.render("cosmetics/search", { cosmetics, search: search?.search?.trim() })
    } catch (error) {
        return res.render("cosmetics/search", { messages: parseErrorMessage(error), search: search?.search?.trim() });
    }
});

export default cosmeticController;