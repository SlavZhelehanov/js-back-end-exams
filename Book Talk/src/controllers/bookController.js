import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import bookService from "../services/bookService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
// import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

const bookController = Router();

// CREATE
bookController.get("/create", isUser, (req, res) => {
    return res.render("book/create");
});
bookController.post("/create", isUser, async (req, res) => {
    const { title, author, image, review, genre, stars } = req.body;

    try {
        await bookService.createBook({ title, author, image, review, genre, stars, owner: req.user.id });
        return res.redirect("/books");
    } catch (error) {
        return res.render("book/create", { messages: parseErrorMessage(error), title, author, image, review, genre, stars });
    }
});

// CATALOG
bookController.get("/", async (req, res) => {
    try {
        const books = await bookService.getAllBooks();

        return res.render("book/catalog", { books });
    } catch (error) {
        return res.render("book/catalog", { messages: parseErrorMessage(error) });
    }
});

// DETAILS
bookController.get("/:id/details", async (req, res) => {
    return res.render("book/details");
});

// EDIT
bookController.get("/:id/edit", isUser, async (req, res) => {
    return res.render("book/edit");
});

// PROFILE
bookController.get("/profile", isUser, async (req, res) => {
    return res.render("book/profile");
});

export default bookController;