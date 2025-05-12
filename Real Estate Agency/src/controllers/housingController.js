import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import housingService from "../services/housingService.js";
// import { gettypes } from "../util/gettypes.js";
// import { validateQuery } from "../util/validateUrls.js";
import { isValidId } from "../middlewares/utlParamsMiddleware.js";

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
housingController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const housing = await housingService.getOneHousing({ _id: req.params.id }).lean().populate("rentedAhome", "name");

        if (!housing) return res.redirect("/404");

        const isOwner = housing.owner.equals(req.user?.id);
        const isRented = req.user && !isOwner && housing.rentedAhome.some(id => id.equals(req.user.id));
        const availablePieces = 0 < housing.pieces ? housing.pieces : null;
        const tenants = 0 < housing.rentedAhome.length ? housing.rentedAhome.join(", ") : null;

        return res.render("housing/details", { ...housing, isOwner, isRented, availablePieces, tenants });
    } catch (error) {
        return res.render("housing/details", { messages: parseErrorMessage(error) });
    }
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