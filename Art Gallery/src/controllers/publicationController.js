import { Router } from "express";

import parseErrorMessage from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import publicationService from "../services/publicationService.js";
// import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const publicationController = Router();

// GALLERY
publicationController.get("/", async (req, res) => {
    try {
        const publications = await publicationService.getAllPublications();

        return res.render("publication/gallery", { publications });
    } catch (error) {
        return res.render("publication/gallery", { messages: parseErrorMessage(error) });
    }
});

// DETAILS
publicationController.get("/:id/details", async (req, res) => {
    return res.render("publication/details");
});

// CREATE
publicationController.get("/create", isUser, (req, res) => {
    return res.render("publication/create");
});
publicationController.post("/create", isUser, async (req, res) => {
    const { title, paintingTechnique, picture, certificate } = req.body;

    try {
        await publicationService.createPublication({ title, paintingTechnique, picture, certificate, author: req.user.id });
        return res.redirect("/publications");
    } catch (error) {
        return res.render("publication/create", { messages: parseErrorMessage(error), title, paintingTechnique, picture, certificate });
    }
});

// EDIT
publicationController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("publication/edit");
});

export default publicationController;