import { Router } from "express";

// import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
// import housingsService from "../services/housingsService.js";
// import { getTypeOfhousings } from "../util/getTypeOfhousings.js";
// import { validateQuery } from "../util/validateUrls.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const housingController = Router();

// CATALOG
housingController.get("/", async (req, res) => {
    return res.render("housing/catalog");
});

// DETAILS
housingController.get("/:id/details", async (req, res) => {
    return res.render("housing/details");
});

// CREATE
housingController.get("/create", isUser, (req, res) => {
    return res.render("housing/create");
});

// EDIT
housingController.get("/:id/edit", async (req, res) => {
    return res.render("housing/edit");
});

// SEARCH
housingController.get("/search", async (req, res) => {
    return res.render("housing/search");
});

export default housingController;