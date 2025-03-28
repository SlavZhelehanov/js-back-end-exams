import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import electronicService from "../services/electronicService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const electronicController = Router();

// CATALOG
electronicController.get("/", async (req, res) => {
    try {
        const electronics = await electronicService.getAllElectronics();

        return res.render("electronic/catalog", { electronics });
    } catch (error) {
        return res.render("electronic/catalog", { messages: parseErrorMessage(error) });
    }
});

// CREATE
electronicController.get("/create", isUser, (req, res) => {
    return res.render("electronic/create");
});
electronicController.post("/create", isUser, async (req, res) => {
    const electronic = req.body;

    try {
        await electronicService.createElectronic({ ...electronic, owner: req.user.id });
        return res.redirect("/electronics");
    } catch (error) {
        return res.render("electronic/create", { messages: parseErrorMessage(error), ...electronic });
    }
});

// DETAILS
electronicController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const electronic = await electronicService.findOneElectronic(req.params.id);

        if (!electronic) return res.redirect("/404");

        const isOwner = electronic.owner.equals(req.user?.id);
        const isBought = req.user && !isOwner && electronic.buyingList.some(id => id.equals(req.user.id));

        return res.render("electronic/details", { electronic, isOwner, isBought });
    } catch (error) {
        return res.render("electronic/details", { messages: parseErrorMessage(error) });
    }
});

// BUY
electronicController.get("/:id/buy", isUser, isValidId, async (req, res) => {
    try {
        const electronic = await electronicService.findOneElectronic(req.params.id);

        if (!electronic || electronic.owner.equals(req.user.id) || electronic.buyingList.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await electronicService.buyOneElectronic(req.params.id, req.user.id);

        return res.redirect(`/electronics/${req.params.id}/details`);
    } catch (error) {
        return res.render("electronic/details", { messages: parseErrorMessage(error) });
    }
});

// DELETE
electronicController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const electronic = await electronicService.deleteOneElectronic(req.params.id, req.user.id);

        if (!electronic) return res.redirect("/404");

        return res.redirect("/electronics");
    } catch (error) {
        return res.render("electronic/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
electronicController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const electronic = await electronicService.findOneElectronic(req.params.id);

        if (!electronic || !electronic.owner.equals(req.user.id)) return res.redirect("/404");

        return res.render("electronic/edit", { electronic });
    } catch (error) {
        return res.redirect("/404");
    }
});
electronicController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const electronic = await electronicService.findOneElectronic(req.params.id);

        if (!electronic) return res.redirect("/404");

        await electronicService.updateOneElectronic({ _id: req.params.id, owner: req.user.id, formData, electronic });

        return res.redirect(`/electronics/${req.params.id}/details`);
    } catch (error) {
        return res.render("electronic/edit", { messages: parseErrorMessage(error), electronic: formData });
    }
});

// SEARCH
electronicController.get("/search", async (req, res) => {
    const query = req.query;

    try {
        const electronics = await electronicService.getAllElectronics(query);

        return res.render("electronic/search", { electronics, name: query?.name?.trim(), type: query?.type?.trim() });
    } catch (error) {
        return res.render("electronic/search", { messages: parseErrorMessage(error), name: query?.name?.trim(), type: query?.type?.trim() });
    }
});

export default electronicController;