import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import { getTypeOfCategory } from "../util/getTypeOfCategory.js";
import auctionService from "../services/auctionService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const auctionController = Router();

// PUBLISH
auctionController.get("/publish", isUser, (req, res) => {
    const types = getTypeOfCategory();
    return res.render("auction/publish", { types });
});
auctionController.post("/publish", isUser, async (req, res) => {
    const { title, description, category, image, price } = req.body;

    try {
        await auctionService.publishAuction({ title, description, category, image, price, author: req.user.id });
        return res.redirect("/auctions");
    } catch (error) {
        const types = getTypeOfCategory(category);
        return res.render("auction/publish", { messages: parseErrorMessage(error), types, title, category, image, price, description });
    }
});

// CATALOG
auctionController.get("/", async (req, res) => {
    try {
        const auctions = await auctionService.getAllAuctions({ isClosed: false });

        return res.render("auction/browse", { auctions });
    } catch (error) {
        return res.render("auction/browse", { messages: parseErrorMessage(error) });
    }
});

// DETAILS
auctionController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const auction = await auctionService.getOneAuction({ _id: req.params.id }).lean();

        if (!auction || auction.isClosed) return res.redirect("/404");

        const isAuthor = auction.author._id.equals(req.user.id);
        const isBidder = req.user && !isAuthor && auction?.bidder._id.equals(req.user.id);

        return res.render("auction/details", { ...auction, isAuthor, isBidder });
    } catch (error) {
        return res.render("auction/details", { messages: parseErrorMessage(error) });
    }
});

// BID
auctionController.post("/:id/bid", isUser, isValidId, async (req, res) => {
    const bidPrice = req.body.bidPrice;
    let auction = {};
    let isAuthor, isBidder;

    try {
        auction = await auctionService.getOneAuction({ _id: req.params.id }).lean();

        isAuthor = auction.author._id.equals(req.user.id);
        isBidder = req.user && !isAuthor && auction?.bidder?._id?.equals(req.user.id);

        if (isNaN(+bidPrice) || +bidPrice < 0) throw new Error("The bid price should be a positive number");
        if (!auction || auction.isClosed || !req.user || auction.author._id.equals(req.user.id)) return res.redirect("/404");
        if (+bidPrice <= auction.price) throw new Error("The bid price should be higher than the current price");

        await auctionService.bidAuction(req.params.id, req.user.id, bidPrice);

        return res.redirect(`/auctions/${req.params.id}/details`);
    } catch (error) {
        return res.render("auction/details", { messages: parseErrorMessage(error), ...auction, isAuthor, isBidder, bidPrice });
    }
});

// CLOSE
auctionController.get("/:id/close", isUser, isValidId, async (req, res) => {
    try {
        const auction = await auctionService.getOneAuction({ _id: req.params.id }).lean();

        console.log(auction.isClosed);


        if (!auction || auction.isClosed || !auction.author._id.equals(req.user.id)) return res.redirect("/404");

        await auctionService.closeAuction(req.params.id);

        return res.redirect("/auctions/closed");
    } catch (error) {
        return res.render("auction/details", { messages: parseErrorMessage(error) });
    }
});

// Closed Auctions
auctionController.get("/closed", async (req, res) => {
    try {
        const auctions = await auctionService.getAllAuctions({ author: req.user.id, isClosed: true }, "author");

        return res.render("auction/closed-auctions", { auctions });
    } catch (error) {
        return res.render("auction/closed-auctions", { messages: parseErrorMessage(error) });
    }
});

// EDIT
auctionController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const auction = await auctionService.getOneAuction({ _id: req.params.id, author: req.user?.id }).lean();

        if (!auction) return res.redirect("/404");

        const types = getTypeOfCategory(auction.category);

        return res.render("auction/edit", { ...auction, types });
    } catch (error) {
        return res.render("auction/edit", { messages: parseErrorMessage(error) });
    }
});

export default auctionController;