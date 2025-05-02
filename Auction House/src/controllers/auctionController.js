import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import { getTypeOfCategory } from "../util/getTypeOfCategory.js";
import auctionService from "../services/auctionService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

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
    try {
        const auctions = await auctionService.getAllAuctions();

        return res.render("auction/browse", { auctions });
    } catch (error) {
        return res.render("auction/browse", { messages: parseErrorMessage(error) });
    }
});

// DETAILS
auctionController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const auction = await auctionService.getOneAuction({ _id: req.params.id }).lean();

        if (!auction) return res.redirect("/404");

        const isAuthor = auction.author._id.equals(req.user?.id);
        const isBidder = req.user && !isAuthor && auction?.bidder?._id.equals(req.user.id);
        return res.render("auction/details", { ...auction, isAuthor, isBidder });
    } catch (error) {
        return res.render("auction/details", { messages: parseErrorMessage(error) });
    }
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