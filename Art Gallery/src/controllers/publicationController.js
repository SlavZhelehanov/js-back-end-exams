import { Router } from "express";

import parseErrorMessage from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import publicationService from "../services/publicationService.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

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
publicationController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const publication = await publicationService.getOnePublication({ _id: req.params.id }).populate("author").lean();

        if (!publication) return res.redirect("/404");

        const isAuthor = publication.author._id.equals(req.user?.id);
        const isShared = req.user && !isAuthor && publication.usersShared.some(id => id.equals(req.user.id));

        return res.render("publication/details", { ...publication, isAuthor, isShared });
    } catch (error) {
        return res.render("publication/details", { messages: parseErrorMessage(error) });
    }
});

// SHARE
publicationController.get("/:id/share", isUser, isValidId, async (req, res) => {
    try {
        const publication = await publicationService.getOnePublication({ _id: req.params.id });

        if (!publication || !req.user || publication.author.equals(req.user.id) || publication.usersShared.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await publicationService.sharePublication(req.params.id, req.user.id);

        return res.redirect(`/publications/${req.params.id}/details`);
    } catch (error) {
        return res.render("publication/details", { messages: parseErrorMessage(error) });
    }
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
publicationController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const publication = await publicationService.getOnePublication({ _id: req.params.id, author: req.user?.id }).lean();

        if (!publication) return res.redirect("/404");

        return res.render("publication/edit", { ...publication });
    } catch (error) {
        return res.render("publication/edit", { messages: parseErrorMessage(error) });
    }
});
publicationController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const publication = await publicationService.getOnePublication({ _id: req.params.id, author: req.user?.id });

        if (!publication) return res.redirect("/404");

        await publicationService.updateOnePublication(req.params.id, req.user.id, publication, formData);

        return res.redirect(`/publications/${req.params.id}/details`);
    } catch (error) {
        return res.render("publication/edit", { ...formData, messages: parseErrorMessage(error) });
    }
});

export default publicationController;