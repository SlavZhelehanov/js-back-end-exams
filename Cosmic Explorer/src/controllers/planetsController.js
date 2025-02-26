import { Router } from "express";

const planetsController = Router();

import planetService from "../services/planetService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { setRings, setTypes } from "../util/setOptionsValues.js";

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
    const types = setTypes();
    const rings = setRings();

    return res.render("planet/create", { rings, types });
});
planetsController.post("/create", async (req, res) => {
    const planet = req.body;
    const types = setTypes(planet.type);
    const rings = setRings(planet.rings);

    try {
        await planetService.createPlanet({ ...planet, owner: req.user.id });
        return res.redirect("/planets");
    } catch (error) {
        return res.render("planet/create", { messages: parseErrorMessage(error), planet, rings, types });
    }
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