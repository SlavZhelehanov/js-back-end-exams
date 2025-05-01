import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
// import auctionService from "../services/auctionService.js";
// import parseErrorMessage from "../util/parseErrorMessage.js";
// import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const auctionController = Router();

// CREATE
auctionController.get("/publish", isUser, (req, res) => {
    return res.render("auction/create");
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