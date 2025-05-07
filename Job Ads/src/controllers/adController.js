import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import adService from "../services/adService.js";
// import { getTypeOfads } from "../util/getTypeOfads.js";
// import { validateQuery } from "../util/validateUrls.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";

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
adsController.get("/:id/details", async (req, res) => {
    return res.render("ads/details");
});

// CREATE
adsController.get("/create", isUser, (req, res) => {
    return res.render("ads/create");
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