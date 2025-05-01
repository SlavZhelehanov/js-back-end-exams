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

export default auctionController;