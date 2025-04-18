import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
// import bookService from "../services/bookService.js";
// import parseErrorMessage from "../util/parseErrorMessage.js";
// import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const bookController = Router();

// CREATE
bookController.get("/create", isUser, (req, res) => {
    return res.render("book/create");
});

// CATALOG
bookController.get("/", async (req, res) => {
    return res.render("book/catalog");
});

// DETAILS
bookController.get("/:id/details", async (req, res) => {
    return res.render("book/details");
});

// EDIT
bookController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("book/edit");
});

export default bookController;