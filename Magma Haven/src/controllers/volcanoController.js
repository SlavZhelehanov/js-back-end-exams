import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import { getTypeOfVolcano } from "../util/getTypeOfVolcano.js";
import volcanoService from "../services/volcanoService.js";
import { parseErrorMessage } from "../util/parseErrorMessage.js";

const volcanoController = Router();

// CATALOG
volcanoController.get("/", async (req, res) => {
    try {
        const volcanos = await volcanoService.getAllVolcanos();

        return res.render("volcano/catalog", { volcanos });
    } catch (error) {
        return res.render("volcano/catalog", { messages: parseErrorMessage(error) });
    }
});

// CREATE
volcanoController.get("/create", isUser, (req, res) => {
    const volcanoTypes = getTypeOfVolcano();
    return res.render("volcano/create", { volcanoTypes });
});
volcanoController.post("/create", isUser, async (req, res) => {
    const { nameOfTheVolcano, location, elevation, lastEruption, image, typeOfVolcano, description } = req.body;

    try {
        await volcanoService.createVolcano({ nameOfTheVolcano, location, elevation, lastEruption, image, typeOfVolcano, description, owner: req.user.id });
        return res.redirect("/volcanos");
    } catch (error) {
        const volcanoTypes = getTypeOfVolcano(typeOfVolcano);
        return res.render("volcano/create", { messages: parseErrorMessage(error), volcanoTypes, nameOfTheVolcano, location, elevation, lastEruption, image, typeOfVolcano, description });
    }
});

// DETAILS
volcanoController.get("/:id/details", async (req, res) => {
    return res.render("volcano/details");
});

// EDIT
volcanoController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("volcano/edit");
});

// SEARCH
volcanoController.get("/search", async (req, res) => {
    return res.render("volcano/search");
});

export default volcanoController;