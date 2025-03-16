import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import { getTypeOfVolcano } from "../util/getTypeOfVolcano.js";
import volcanoService from "../services/volcanoService.js";
import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isValidId } from "../middlewares/utlParamsMiddleware.js";
import { validateQuery } from "../util/validateUrls.js";

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
volcanoController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const volcano = await volcanoService.getOneVolcano({ _id: req.params.id });

        if (!volcano) return res.redirect("/404");

        const isOwner = volcano.owner.equals(req.user?.id);
        const isVoted = req.user && !isOwner && volcano.voteList.some(id => id.equals(req.user.id));

        return res.render("volcano/details", { volcano, isOwner, isVoted });
    } catch (error) {
        return res.render("volcano/details", { messages: parseErrorMessage(error) });
    }
});

// VOTE
volcanoController.get("/:id/vote", isUser, isValidId, async (req, res) => {
    let volcano;

    try {
        volcano = await volcanoService.getOneVolcano({ _id: req.params.id });

        if (!volcano || !req.user || volcano.owner.equals(req.user.id) || volcano.voteList.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await volcanoService.voteToVolcano(req.params.id, req.user.id);

        return res.redirect(`/volcanos/${req.params.id}/details`);
    } catch (error) {
        return res.render("volcano/details", { messages: parseErrorMessage(error), volcano, isOwner: volcano && volcano.owner.equals(req.user?.id), isVoted: volcano && req.user && !volcano.owner.equals(req.user?.id) && volcano.voteList.some(id => id.equals(req.user.id)) });
    }
});

// DELETE
volcanoController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const query = await volcanoService.deleteOneVolcano(req.params.id, req.user.id);

        if (!query) return res.redirect("/404");

        return res.redirect("/volcanos");
    } catch (error) {
        return res.render("volcano/details", { messages: parseErrorMessage(error), volcano, isOwner: volcano && volcano.owner.equals(req.user?.id), isVoted: volcano && req.user && !volcano.owner.equals(req.user?.id) && volcano.voteList.some(id => id.equals(req.user.id)) });
    }
});

// EDIT
volcanoController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const volcano = await volcanoService.getOneVolcano({ _id: req.params.id, owner: req.user?.id });

        if (!volcano) return res.redirect("/404");

        const volcanoTypes = getTypeOfVolcano(volcano.typeOfVolcano);

        return res.render("volcano/edit", { volcano, volcanoTypes });
    } catch (error) {
        return res.render("volcano/edit", { messages: parseErrorMessage(error) });
    }
});
volcanoController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const volcano = await volcanoService.getOneVolcano({ _id: req.params.id, owner: req.user?.id });

        if (!volcano) return res.redirect("/404");

        await volcanoService.updateOneVolcano(req.params.id, req.user.id, volcano, formData);

        return res.redirect(`/volcanos/${req.params.id}/details`);
    } catch (error) {
        const volcanoTypes = getTypeOfVolcano(formData.typeOfvolcano);
        return res.render("volcano/edit", { volcano: formData, volcanoTypes, messages: parseErrorMessage(error) });
    }
});

// SEARCH
volcanoController.get("/search", async (req, res) => {
    const search = validateQuery(req.query) ? req.query : null;
    const volcanoTypes = getTypeOfVolcano(req.query?.typeOfVolcano);

    try {
        const volcanos = await volcanoService.getAllVolcanos(search);

        return res.render("volcano/search", { volcanoTypes, volcanos, nameOfTheVolcano: search?.nameOfTheVolcano });
    } catch (error) {
        return res.render("volcano/search", { messages: parseErrorMessage(error), nameOfTheVolcano: search?.nameOfTheVolcano, volcanoTypes });
    }
});

export default volcanoController;