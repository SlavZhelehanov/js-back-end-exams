import { Router } from "express";

const planetsController = Router();

import planetService from "../services/planetService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { setRings, setTypes } from "../util/setOptionsValues.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";
import { isUser } from "../middlewares/authMiddleware.js";

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
planetsController.get("/create", isUser, (req, res) => {
    const types = setTypes();
    const rings = setRings();

    return res.render("planet/create", { rings, types });
});
planetsController.post("/create", isUser, async (req, res) => {
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
planetsController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const planet = await planetService.findOnePlanet(req.params.id);

        if (!planet) return res.redirect("/404");

        const isOwner = planet.owner.equals(req.user?.id);
        const isLiked = req.user && !isOwner && planet.likedList.some(id => id.equals(req.user.id));

        return res.render("planet/details", { planet, isOwner, isLiked });
    } catch (error) {
        return res.render("planet/details", { messages: parseErrorMessage(error) });
    }
});

// LIKE
planetsController.get("/:id/like", isUser, isValidId, async (req, res) => {
    try {
        const planet = await planetService.findOnePlanet(req.params.id);

        if (!planet || planet.owner.equals(req.user.id) || planet.likedList.some(id => id.equals(req.user.id))) return res.redirect("/404");

        const update = await planetService.likeOnePlanet(req.params.id, req.user.id);

        return res.redirect(`/planets/${req.params.id}/details`);
    } catch (error) {
        return res.render("planet/details", { messages: parseErrorMessage(error) });
    }
});

// DELETE
planetsController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const planet = await planetService.deleteOnePlanet(req.params.id, req.user.id);

        if (!planet) return res.redirect("/404");

        return res.redirect("/planets");
    } catch (error) {
        return res.render("planet/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
planetsController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const planet = await planetService.findOnePlanet(req.params.id);

        if (!planet || !planet.owner.equals(req.user.id)) return res.redirect("/404");

        const types = setTypes(planet.type);
        const rings = setRings(planet.rings);

        return res.render("planet/edit", { planet, types, rings });
    } catch (error) {
        return res.redirect("/404");
    }
});
planetsController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;
    const types = setTypes(formData.type);
    const rings = setRings(formData.rings);
    const options = {};

    try {
        const planet = await planetService.findOnePlanet(req.params.id);

        if (!planet) return res.redirect("/404");

        for (const key in formData) if (formData[key] != planet[key]) options[key] = formData[key];

        await planetService.updateOnePlanet({ _id: req.params.id, owner: req.user.id, options });
        return res.redirect(`/planets/${req.params.id}/details`);
    } catch (error) {
        return res.render("planet/edit", { messages: parseErrorMessage(error), planet: formData, rings, types });
    }
});

// SEARCH
planetsController.get("/search", async (req, res) => {
    const query = req.query;

    try {
        const planets = await planetService.getAllPlanets(query);

        return res.render("planet/search", { planets, query });
    } catch (error) {
        return res.render("planet/search", { messages: parseErrorMessage(error), query });
    }
});

export default planetsController;