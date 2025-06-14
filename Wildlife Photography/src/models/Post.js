import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title point field can't be empty"],
        minLength: [6, "The title point should be at least 6 characters long"]
    },
    keyword: {
        type: String,
        required: [true, "The keyword field can't be empty"],
        minLength: [6, "The keyword should be at least 6 characters long"]
    },
    date: {
        type: String,
        required: [true, "The date's field can't be empty"],
        minLength: [10, 'The Date should be exactly 10 characters - "02.02.2021"'],
        maxLength: [10, 'The Date should be exactly 10 characters - "02.02.2021"']
    },
    location: {
        type: String,
        required: [true, "The location's field can't be empty"],
        minLength: [15, "The location should be at least 15 characters long"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The image should start with http:// or https://"]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [8, "The Description should be at least 8 characters long"]
    },
    rating: {
        type: Number,
        default: 0
    },
    votes : {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Post", postSchema);