import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import creatureService from "../services/creatureService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const creatureController = Router();

// CATALOG
creatureController.get("/", async (req, res) => {
    try {
        const creatures = await creatureService.getAllCreatures();

        return res.render("creature/catalog", { creatures });
    } catch (error) {
        return res.render("creature/catalog", { messages: parseErrorMessage(error) });
    }
});

// CREATE
creatureController.get("/create", isUser, (req, res) => {
    return res.render("creature/create");
});
creatureController.post("/create", isUser, async (req, res) => {
    const { name, species, skinColor, eyeColor, image, description } = req.body;

    try {
        await creatureService.createCreature({ name, species, skinColor, eyeColor, image, description, owner: req.user.id });
        return res.redirect("/creatures");
    } catch (error) {
        return res.render("creature/create", { messages: parseErrorMessage(error), name, species, skinColor, eyeColor, image, description });
    }
});

// DETAILS
creatureController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const creature = await creatureService.getOneCreature({ _id: req.params.id });

        if (!creature) return res.redirect("/404");

        const isOwner = creature.owner.equals(req.user?.id);
        const isVoted = req.user && !isOwner && creature.votes.some(id => id.equals(req.user.id));
        const hasVoters = 0 < creature.votes.length ? creature.votes.join(", ") : null;

        return res.render("creature/details", { creature, isOwner, isVoted, hasVoters });
    } catch (error) {
        return res.render("creature/details", { messages: parseErrorMessage(error) });
    }
});

// VOTE
creatureController.get("/:id/vote", isUser, isValidId, async (req, res) => {
    try {
        const creature = await creatureService.getOneCreature({ _id: req.params.id });

        if (!creature) return res.redirect("/404");

        if (!req.user || creature.owner.equals(req.user.id) || creature.votes.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await creatureService.voteForCreature(req.params.id, req.user.id);

        return res.redirect(`/creatures/${req.params.id}/details`);
    } catch (error) {
        return res.render("creature/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
creatureController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const creature = await creatureService.getOneCreature({ _id: req.params.id, owner: req.user?.id });

        if (!creature) return res.redirect("/404");
        return res.render("creature/edit", { creature });
    } catch (error) {
        return res.render("creature/edit", { messages: parseErrorMessage(error) });
    }
});
creatureController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const creature = await creatureService.getOneCreature({ _id: req.params.id, owner: req.user?.id });

        if (!creature) return res.redirect("/404");

        await creatureService.updateOneCreature(req.params.id, req.user.id, creature, formData);

        return res.redirect(`/creatures/${req.params.id}/details`);
    } catch (error) {
        return res.render("creature/edit", { creature: formData, messages: parseErrorMessage(error) });
    }
});

// DELETE
creatureController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const query = await creatureService.deleteOneCreature(req.params.id, req.user.id);

        if (!query) return res.redirect("/404");

        return res.redirect("/creatures");
    } catch (error) {
        return res.render("creature/details", { messages: parseErrorMessage(error) });
    }
});

// PROFILE
creatureController.get("/profile", isUser, async (req, res) => {
    return res.render("creature/profile");
});

export default creatureController;