import { Router } from "express";

import cosmeticService from "../services/cosmeticService.js";
import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import { isValidId } from "../middlewares/utlParamsMiddleware.js";

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

// EDIT
cosmeticController.get("/:id/edit", (req, res) => {
    return res.render("cosmetics/edit");
});

// SEARCH
cosmeticController.get("/search", (req, res) => {
    return res.render("cosmetics/search");
});

export default cosmeticController;