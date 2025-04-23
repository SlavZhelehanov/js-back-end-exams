import Book from "../models/Book.js";

export default {
    createBook(bookData) {
        for (const key in bookData) bookData[key] = bookData[key].trim();

        if (isNaN(+bookData.stars)) throw ["The stars should be a number"];

        return Book.create(bookData);
    },
    getAllBooks(userId = null) {
        const filter = userId ? { wishingList: userId } : {};

        return Book.find(filter, "image title");
    },
    getOneBook(params) {
        return Book.findOne(params);
    },
    wishBook(bookId, newFanId) {
        return Book.findByIdAndUpdate(bookId, { $push: { wishingList: newFanId } }, { new: true });
    },
    updateOneBook(_id, owner, book, formData) {
        const options = {};

        for (const key in formData) if (formData[key].trim() != book[key]) options[key] = formData[key].trim();

        if (0 === Object.keys(options).length) return;

        return Book.findOneAndUpdate({ _id, owner }, options, { new: true, runValidators: true });
    },
    deleteOneBook(_id, owner) {
        return Book.findOneAndDelete({ _id, owner });
    }
};