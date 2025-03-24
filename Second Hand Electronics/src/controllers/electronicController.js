import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import electronicService from "../services/electronicService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";

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
electronicController.get("/:id/details", async (req, res) => {
    return res.render("electronic/details");
});

// EDIT
electronicController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("electronic/edit");
});

// SEARCH
electronicController.get("/search", async (req, res) => {
    return res.render("electronic/search");
});

export default electronicController;