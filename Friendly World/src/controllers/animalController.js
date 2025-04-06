import { Router } from "express";

const animalController = Router();

// import animalService from "../services/animalService.js";
// import parseErrorMessage from "../util/parseErrorMessage.js";
// import { isValidId } from "../middlewares/verifyIsValidObjectId.js";
// import { isUser } from "../middlewares/authMiddleware.js";

// CATALOG
animalController.get("/", async (req, res) => {
    return res.render("animal/catalog");
});

// DETAILS
animalController.get("/:id/details", async (req, res) => {
    return res.render("animal/details");
});

export default animalController;