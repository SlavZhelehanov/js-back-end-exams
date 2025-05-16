import { Router } from "express";

import parseErrorMessage from "../util/parseErrorMessage.js";
import { isUser } from "../middlewares/authMiddleware.js";
import tripService from "../services/tripService.js";
// import { getTypeOftrip } from "../util/getTypeOftrip.js";
// import { validateQuery } from "../util/validateUrls.js";
// import { isValidId } from "../middlewares/utlParamsMiddleware.js";

const tripController = Router();

// SHARED TRIPS
tripController.get("/", async (req, res) => {
    return res.render("trip/shared-trips");
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
tripController.get("/:id/details", async (req, res) => {
    return res.render("trip/details");
});

// EDIT
tripController.get("/:id/edit", async (req, res) => {
    return res.render("trip/edit");
});

// EDIT
tripController.get("/profile", async (req, res) => {
    return res.render("trip/profile");
});

export default tripController;