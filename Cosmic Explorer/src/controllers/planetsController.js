import { Router } from "express";

const planetsController = Router();

import planetService from "../services/planetService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";

// CATALOG
planetsController.get("/", async (req, res) => {
    try {
        const planets = await planetService.getAllPlanets();

        return res.render("planet/catalog", { planets });
    } catch (error) {
        return res.render("planet/catalog", { messages: parseErrorMessage(error) });
    }
});

// CREATE
planetsController.get("/create", (req, res) => {
    return res.render("planet/create");
});

// DETAILS
planetsController.get("/:id/details", (req, res) => {
    return res.render("planet/details");
});

// EDIT
planetsController.get("/:id/edit", (req, res) => {
    return res.render("planet/edit");
});

// SEARCH
planetsController.get("/search", (req, res) => {
    return res.render("planet/search");
});

export default planetsController;