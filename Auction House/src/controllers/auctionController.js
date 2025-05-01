import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
// import deviceService from "../services/deviceService.js";
// import parseErrorMessage from "../util/parseErrorMessage.js";
// import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const auctionController = Router();

// CREATE
auctionController.get("/publish", isUser, (req, res) => {
    return res.render("auction/create");
});

export default auctionController;