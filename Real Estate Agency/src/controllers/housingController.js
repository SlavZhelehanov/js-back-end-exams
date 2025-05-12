import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import housingService from "../services/housingService.js";
// import { gettypes } from "../util/gettypes.js";
// import { validateQuery } from "../util/validateUrls.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const housingController = Router();

// CATALOG
housingController.get("/", async (req, res) => {
    try {
        const housings = await housingService.getAllHousings();

        return res.render("housing/catalog", { housings });
    } catch (error) {
        return res.render("housing/catalog", { messages: parseErrorMessage(error) });
    }
});

// DETAILS
housingController.get("/:id/details", async (req, res) => {
    return res.render("housing/details");
});

// CREATE
housingController.get("/create", isUser, (req, res) => {
    return res.render("housing/create");
});
housingController.post("/create", isUser, async (req, res) => {
    const { name, type, year, city, image, description, pieces } = req.body;

    try {
        await housingService.createHousing({ name, type, year, city, image, description, pieces, owner: req.user.id });
        return res.redirect("/housings");
    } catch (error) {
        return res.render("housing/create", { messages: parseErrorMessage(error), type, name, year, city, image, description, pieces });
    }
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