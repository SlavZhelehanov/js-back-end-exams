import Book from "../models/Book.js";

export default {
    createBook(bookData) {
        for (const key in bookData) bookData[key] = bookData[key].trim();

        if (isNaN(+bookData.stars)) throw ["The stars should be a number"];

        return Book.create(bookData);
    },
    getAllBooks() {
        return Book.find({}, "image title");
    }
};