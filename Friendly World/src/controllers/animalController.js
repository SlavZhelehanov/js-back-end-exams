import { Router } from "express";

const animalController = Router();

import animalService from "../services/animalService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";
import { isUser } from "../middlewares/authMiddleware.js";

// CATALOG
animalController.get("/", async (req, res) => {
    try {
        const animals = await animalService.getAllAnimals({}, "name image need location");

        return res.render("animal/catalog", { animals });
    } catch (error) {
        return res.render("animal/catalog", { messages: parseErrorMessage(error) });
    }
});

// DETAILS
animalController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const animal = await animalService.findOneAnimal(req.params.id);

        if (!animal) return res.redirect("/404");

        const isOwner = animal.owner.equals(req.user?.id);
        const isDonated = req.user && !isOwner && animal.donations.some(id => id.equals(req.user.id));

        return res.render("animal/details", { animal, isOwner, isDonated });
    } catch (error) {
        return res.render("animal/details", { messages: parseErrorMessage(error) });
    }
});

// DONATE
animalController.get("/:id/donate", isUser, isValidId, async (req, res) => {
    try {
        const animal = await animalService.findOneAnimal(req.params.id);

        if (!animal || animal.owner.equals(req.user.id) || animal.donations.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await animalService.donateToOneAnimal(req.params.id, req.user.id);

        return res.redirect(`/animals/${req.params.id}/details`);
    } catch (error) {
        return res.render("animal/details", { messages: parseErrorMessage(error) });
    }
});

// DELETE
animalController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const animal = await animalService.deleteOneAnimal(req.params.id, req.user.id);

        if (!animal) return res.redirect("/404");

        return res.redirect("/animals");
    } catch (error) {
        return res.render("animal/details", { messages: parseErrorMessage(error) });
    }
});

// CREATE
animalController.get("/create", isUser, (req, res) => {
    return res.render("animal/create");
});
animalController.post("/create", isUser, async (req, res) => {
    const animal = req.body;

    try {
        await animalService.createAnimal({ ...animal, owner: req.user.id });
        return res.redirect("/animals");
    } catch (error) {
        return res.render("animal/create", { messages: parseErrorMessage(error), ...animal });
    }
});

// EDIT
animalController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const animal = await animalService.findOneAnimal(req.params.id).lean();

        if (!animal || !animal.owner.equals(req.user.id)) return res.redirect("/404");

        console.log({ ...animal });


        return res.render("animal/edit", { ...animal });
    } catch (error) {
        return res.redirect("/404");
    }
});
animalController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const animal = await animalService.findOneAnimal(req.params.id).lean();

        if (!animal) return res.redirect("/404");

        await animalService.updateOneAnimal({ _id: req.params.id, owner: req.user.id, animal, formData });
        return res.redirect(`/animals/${req.params.id}/details`);
    } catch (error) {
        return res.render("animal/edit", { messages: parseErrorMessage(error), ...formData });
    }
});

// SEARCH
animalController.get("/search", async (req, res) => {
    const query = req.query?.location?.trim();
    const filter = query ? { location: { $regex: query, $options: "i" } } : {};

    try {
        const animals = await animalService.getAllAnimals(filter, "name image need location");

        return res.render("animal/search", { animals, location: query });
    } catch (error) {
        return res.render("animal/search", { messages: parseErrorMessage(error), location: query });
    }
});

export default animalController;