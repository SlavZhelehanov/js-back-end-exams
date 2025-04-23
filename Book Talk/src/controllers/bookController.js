import { Router } from "express";

import { isUser } from "../middlewares/authMiddleware.js";
import bookService from "../services/bookService.js";
import parseErrorMessage from "../util/parseErrorMessage.js";
import { isValidId } from "../middlewares/verifyIsValidObjectId.js";

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
bookController.get("/:id/details", isValidId, async (req, res) => {
    try {
        const book = await bookService.getOneBook({ _id: req.params.id }).lean();

        if (!book) return res.redirect("/404");
        
        const isOwner = book.owner.equals(req.user?.id);
        const isWished = req.user && !isOwner && book.wishingList.some(id => id.equals(req.user.id));

        return res.render("book/details", { ...book, isOwner, isWished });
    } catch (error) {
        return res.render("book/details", { messages: parseErrorMessage(error) });
    }
});

// WISH
bookController.get("/:id/wish", isUser, isValidId, async (req, res) => {
    try {
        const book = await bookService.getOneBook({ _id: req.params.id });

        if (!book || !req.user || book.owner.equals(req.user.id) || book.wishingList.some(id => id.equals(req.user.id))) return res.redirect("/404");

        await bookService.wishBook(req.params.id, req.user.id);

        return res.redirect(`/books/${req.params.id}/details`);
    } catch (error) {
        return res.render("book/details", { messages: parseErrorMessage(error) });
    }
});

// EDIT
bookController.get("/:id/edit", isUser, isValidId, async (req, res) => {
    try {
        const book = await bookService.getOneBook({ _id: req.params.id, owner: req.user?.id }).lean();

        if (!book) return res.redirect("/404");

        return res.render("book/edit", { ...book });
    } catch (error) {
        return res.render("book/edit", { messages: parseErrorMessage(error) });
    }
});
bookController.post("/:id/edit", isUser, isValidId, async (req, res) => {
    const formData = req.body;

    try {
        const book = await bookService.getOneBook({ _id: req.params.id, owner: req.user?.id });

        if (!book) return res.redirect("/404");

        await bookService.updateOneBook(req.params.id, req.user.id, book, formData);

        return res.redirect(`/books/${req.params.id}/details`);
    } catch (error) {
        return res.render("book/edit", { ...formData, messages: parseErrorMessage(error) });
    }
});

// DELETE
bookController.get("/:id/delete", isUser, isValidId, async (req, res) => {
    try {
        const query = await bookService.deleteOneBook(req.params.id, req.user.id);

        if (!query) return res.redirect("/404");

        return res.redirect("/books");
    } catch (error) {
        return res.render("book/details", { messages: parseErrorMessage(error) });
    }
});

// PROFILE
bookController.get("/profile", isUser, async (req, res) => {
    return res.render("book/profile");
});

export default bookController;