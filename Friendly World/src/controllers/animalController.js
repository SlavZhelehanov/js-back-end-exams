import { Router } from "express";

const animalController = Router();

// import animalService from "../services/animalService.js";
// import parseErrorMessage from "../util/parseErrorMessage.js";
// import { isValidId } from "../middlewares/verifyIsValidObjectId.js";
import { isUser } from "../middlewares/authMiddleware.js";

// CATALOG
animalController.get("/", async (req, res) => {
    return res.render("animal/catalog");
});

// DETAILS
animalController.get("/:id/details", async (req, res) => {
    return res.render("animal/details");
});

// CREATE
animalController.get("/create", isUser, (req, res) => {
    return res.render("animal/create");
});

// EDIT
animalController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("animal/edit");
});

// SEARCH
animalController.get("/search", async (req, res) => {
    const query = req.query;

    return res.render("animal/search");
});

export default animalController;