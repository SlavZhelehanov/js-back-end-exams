import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import adService from "../services/adService.js";
import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const adsController = Router();

// CATALOG
adsController.get("/", async (req, res) => {
    try {
        const ads = await adService.getAllAds();

        return res.render("ads/all-ads", { ads });
    } catch (error) {
        return res.render("ads/all-ads", { messages: parseErrorMessage(error) });
    }
});

// DETAILS
adsController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const ad = await adService.getOneAd({ _id: req.params.id });

        if (!ad) return res.redirect("/404");

        const isAuthor = ad.author._id.equals(req.user?.id);
        const isApplied = req.user && !isAuthor && ad.usersApplied.some(user => user._id.equals(req.user.id));

        return res.render("ads/details", { ...ad, isAuthor, isApplied });
    } catch (error) {
        return res.render("ads/details", { messages: parseErrorMessage(error) });
    }
});

// CREATE
adsController.get("/create", isUser, (req, res) => {
    return res.render("ads/create");
});
adsController.post("/create", isUser, async (req, res) => {
    const { headline, location, company, description } = req.body;

    try {
        await adService.createAd({ headline, location, company, description, author: req.user.id });
        return res.redirect("/ads");
    } catch (error) {
        return res.render("ads/create", { messages: parseErrorMessage(error), headline, location, company, description });
    }
});

// APPLY
adsController.get("/:id/apply", isUser, isValidId, async (req, res) => {
    try {
        const ad = await adService.getOneAd({ _id: req.params.id });

        if (!ad || !req.user || ad.author._id.equals(req.user.id) || ad.usersApplied.some(user => user._id.equals(req.user.id))) return res.redirect("/404");

        await adService.applyToAd(req.params.id, req.user.id);

        return res.redirect(`/ads/${req.params.id}/details`);
    } catch (error) {
        return res.render("ads/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
adsController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("ads/edit");
});

// SEARCH
adsController.get("/search", async (req, res) => {
    return res.render("ads/search");
});

export default adsController;