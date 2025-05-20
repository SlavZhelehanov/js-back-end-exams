import { Router } from "express";

// import parseErrorMessage from "../util/parseErrorMessage.js";
// import { isUser } from "../middlewares/authMiddleware.js";
// import publicationService from "../services/publicationService.js";
// import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const publicationController = Router();

// GALLERY
publicationController.get("/", async (req, res) => {
    return res.render("publication/gallery");
});

// DETAILS
publicationController.get("/:id/details", async (req, res) => {
    return res.render("publication/details");
});

export default publicationController;