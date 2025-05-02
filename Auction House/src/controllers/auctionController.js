import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import { getTypeOfCategory } from "../util/getTypeOfCategory.js";
import auctionService from "../services/auctionService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
// import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const auctionController = Router();

// CREATE
auctionController.get("/publish", isUser, (req, res) => {
    const types = getTypeOfCategory();
    return res.render("auction/create", { types });
});
auctionController.post("/publish", isUser, async (req, res) => {
    const { title, description, category, image, price } = req.body;

    try {
        await auctionService.publishAuction({ title, description, category, image, price, author: req.user.id });
        return res.redirect("/auctions");
    } catch (error) {
        const types = getTypeOfCategory(category);
        return res.render("auction/create", { messages: parseErrorMessage(error), types, title, category, image, price, description });
    }
});

// CATALOG
auctionController.get("/", async (req, res) => {
    return res.render("auction/browse");
});

// DETAILS
auctionController.get("/:id/details", async (req, res) => {
    return res.render("auction/details");
});

// Closed Auctions
auctionController.get("/closed", async (req, res) => {
    return res.render("auction/closed-auctions");
});

// EDIT
auctionController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("auction/edit");
});

export default auctionController;