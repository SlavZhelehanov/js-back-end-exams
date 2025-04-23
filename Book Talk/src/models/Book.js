import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title field can't be empty"],
        minLength: [2, "The Title should be at least 2 characters long"]
    },
    author: {
        type: String,
        required: [true, "The author field can't be empty"],
        minLength: [5, "The Author should be at least 5 characters long"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The Image should start with http:// or https://"]
    },
    review: {
        type: String,
        required: [true, "The review's field can't be empty"],
        minLength: [10, "The Review should be at least 10 characters long"]
    },
    genre: {
        type: String,
        required: [true, "The genre's field can't be empty"],
        minLength: [3, "The Genre should be at least 3 characters long"]
    },
    stars: {
        type: Number,
        required: [true, "The stars's field can't be empty"],
        min: [1, "The Stars should be a positive number between 1 and 5"],
        max: [5, "The Stars should be a positive number between 1 and 5"]
    },
    wishingList : {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Book", bookSchema);