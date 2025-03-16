import { Router } from "express";

import { parseErrorMessage } from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import disasterService from "../services/disasterService.js";
import { getTypeOfDisaster } from "../util/getTypeOfDisaster.js";
import { validateQuery } from "../util/validateUrls.js";
import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const disasterController = Router();

// CATALOG
disasterController.get("/", async (req, res) => {
    try {
        const disasters = await disasterService.getAllDisasters();

        return res.render("disaster/catalog", { disasters });
    } catch (error) {
        return res.render("disaster/catalog", { messages: parseErrorMessage(error) });
    }
});

// CREATE
disasterController.get("/create", isUser, (req, res) => {
    const types = getTypeOfDisaster();
    return res.render("disaster/create", { types });
});
disasterController.post("/create", isUser, async (req, res) => {
    const { nameOfTheDisaster, typeOfDisaster, yearOfTheEvenet, location, image, description } = req.body;

    try {
        await disasterService.createDisaster({ nameOfTheDisaster, typeOfDisaster, yearOfTheEvenet, location, image, description, owner: req.user.id });
        return res.redirect("/disasters");
    } catch (error) {
        const types = getTypeOfDisaster(typeOfDisaster);
        return res.render("disaster/create", { messages: parseErrorMessage(error), types, disaster: { nameOfTheDisaster, yearOfTheEvenet, location, image, description } });
    }
});

// DETAILS
disasterController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const disaster = await disasterService.getOneDisaster({ _id: req.params.id });

        if (!disaster) return res.redirect("/404");

        const isOwner = disaster.owner.equals(req.user?.id);
        const isInterested = req.user && !isOwner && disaster.interestedList.some(id => id.equals(req.user.id));
        return res.render("disaster/details", { disaster, isOwner, isInterested });
    } catch (error) {
        return res.render("disaster/details", { messages: parseErrorMessage(error) });
    }
});

// INTERESTED
disasterController.get("/:id/interested", isUser, isValidId, async (req, res) => {
    try {
        const disaster = await disasterService.getOneDisaster({ _id: req.params.id });

        if (!disaster) return res.redirect("/404");

        if (!req.user || disaster.owner.equals(req.user.id) || disaster.interestedList.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await disasterService.interestedToDisaster(req.params.id, req.user.id);

        return res.redirect(`/disasters/${req.params.id}/details`);
    } catch (error) {
        return res.render("disaster/details", { messages: parseErrorMessage(error) });
    }
});

// DELETE
disasterController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const query = await disasterService.deleteOneDisaster(req.params.id, req.user.id);

        if (!query) return res.redirect("/404");

        return res.redirect("/disasters");
    } catch (error) {
        return res.render("disaster/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
disasterController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const disaster = await disasterService.getOneDisaster({ _id: req.params.id, owner: req.user?.id });

        if (!disaster) return res.redirect("/404");

        const types = getTypeOfDisaster(disaster.typeOfDisaster);

        return res.render("disaster/edit", { disaster, types });
    } catch (error) {
        return res.render("disaster/edit", { messages: parseErrorMessage(error) });
    }
});
disasterController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const disaster = await disasterService.getOneDisaster({ _id: req.params.id, owner: req.user?.id });

        if (!disaster) return res.redirect("/404");

        await disasterService.updateOneDisaster(req.params.id, req.user.id, disaster, formData);

        return res.redirect(`/disasters/${req.params.id}/details`);
    } catch (error) {
        const types = getTypeOfDisaster(formData.typeOfDisaster);
        return res.render("disaster/edit", { disaster: formData, types, messages: parseErrorMessage(error) });
    }
});

// SEARCH
disasterController.get("/search", async (req, res) => {
    const search = validateQuery(req.query) ? req.query : null;
    const types = getTypeOfDisaster(req.query?.typeOfDisaster);

    try {
        const disasters = await disasterService.getAllDisasters(search);

        return res.render("disaster/search", { types, disasters, nameOfTheDisaster: search?.nameOfTheDisaster });
    } catch (error) {
        return res.render("disaster/search", { messages: parseErrorMessage(error), search, types });
    }
});

export default disasterController;