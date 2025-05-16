import { Router } from "express";

import parseErrorMessage from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import tripService from "../services/tripService.js";
// import { getTypeOftrip } from "../util/getTypeOftrip.js";
// import { validateQuery } from "../util/validateUrls.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const tripController = Router();

// SHARED TRIPS
tripController.get("/", async (req, res) => {
    try {
        const trips = await tripService.getAllTrips();

        return res.render("trip/shared-trips", { trips });
    } catch (error) {
        return res.render("trip/shared-trips", { messages: parseErrorMessage(error) });
    }
});

// CREATE
tripController.get("/create", isUser, (req, res) => {
    return res.render("trip/create");
});
tripController.post("/create", isUser, async (req, res) => {
    const { brand, startPoint, endPoint, date, time, seats, description, price, image } = req.body;

    try {
        await tripService.createTrip({ brand, startPoint, endPoint, date, time, seats, description, price, image, creator: req.user.id });
        return res.redirect("/trips");
    } catch (error) {
        return res.render("trip/create", { messages: parseErrorMessage(error), brand, startPoint, endPoint, date, time, seats, description, price, image });
    }
});

// DETAILS
tripController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const trip = await tripService.getOneTrip({ _id: req.params.id }).populate("buddies", "email").populate("creator", "email").lean();

        if (!trip) return res.redirect("/404");

        const isCreator = trip.creator._id.equals(req.user?.id);
        const isJoined = req.user && !isCreator && trip.buddies.some(buddie => buddie._id.equals(req.user.id));
        const passengers = 0 < trip.buddies.length ? trip.buddies.map(buddie => buddie = buddie.email).join(", ") : null;
        const availableSeats = 0 < trip.seats ? trip.seats : null;

        return res.render("trip/details", { ...trip, isCreator, isJoined, passengers, availableSeats });
    } catch (error) {
        return res.render("trip/details", { messages: parseErrorMessage(error) });
    }
});

// JOIN
tripController.get("/:id/join", isUser, isValidId, async (req, res) => {
    try {
        const trip = await tripService.getOneTrip({ _id: req.params.id });

        if (!trip) return res.redirect("/404");

        if (!req.user || trip.creator.equals(req.user.id) || trip.buddies.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await tripService.joinToTrip(req.params.id, req.user.id);

        return res.redirect(`/trips/${req.params.id}/details`);
    } catch (error) {
        return res.render("trip/details", { messages: parseErrorMessage(error) });
    }
});

// DELETE
tripController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const query = await tripService.deleteOneTrip(req.params.id, req.user.id);

        if (!query) return res.redirect("/404");

        return res.redirect("/trips");
    } catch (error) {
        return res.render("trip/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
tripController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const trip = await tripService.getOneTrip({ _id: req.params.id, creator: req.user?.id }).lean();

        if (!trip) return res.redirect("/404");

        return res.render("trip/edit", { ...trip });
    } catch (error) {
        return res.render("trip/edit", { messages: parseErrorMessage(error) });
    }
});
tripController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const trip = await tripService.getOneTrip({ _id: req.params.id, creator: req.user?.id });

        if (!trip) return res.redirect("/404");

        await tripService.updateOneTrip(req.params.id, req.user.id, trip, formData);

        return res.redirect(`/trips/${req.params.id}/details`);
    } catch (error) {
        return res.render("trip/edit", { ...formData, messages: parseErrorMessage(error) });
    }
});

// EDIT
tripController.get("/profile", async (req, res) => {
    return res.render("trip/profile");
});

export default tripController;