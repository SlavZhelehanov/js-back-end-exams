import { Router } from "express";

// import { parseErrorMessage } from "../util/parseErrorMessage.js";
// import { isUser } from "../middlewares/authMiddleware.js";
// import adsService from "../services/adsService.js";
// import { getTypeOfads } from "../util/getTypeOfads.js";
// import { validateQuery } from "../util/validateUrls.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const adsController = Router();

// CATALOG
adsController.get("/", async (req, res) => {
    return res.render("ads/all-ads");
});

// DETAILS
adsController.get("/:id/details", async (req, res) => {
    return res.render("ads/details");
});

// CREATE
adsController.get("/create", (req, res) => {
    return res.render("ads/create");
});

export default adsController;