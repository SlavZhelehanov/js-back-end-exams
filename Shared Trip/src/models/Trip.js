import { Schema, model } from "mongoose";

const tripSchema = new Schema({
    startPoint: {
        type: String,
        required: [true, "The start point field can't be empty"],
        minLength: [4, "The start point should be at least 4 characters long"]
    },
    endPoint: {
        type: String,
        required: [true, "The end point field can't be empty"],
        minLength: [4, "The end point should be at least 4 characters long"]
    },
    date: {
        type: String,
        required: [true, "The hard disk's field can't be empty"],
        minLength: [5, "The hard disk should be at least 5 characters long"]
    },
    time: {
        type: String,
        required: [true, "The screen size's field can't be empty"],
        minLength: [1, "The screen size should be at least 1 characters long"]
    },
    image: {
        type: String,
        required: [true, "The image's field can't be empty"],
        match: [/^https?:\/\//, "The image should start with http:// or https://"]
    },
    brand: {
        type: String,
        required: [true, "The brand's field can't be empty"],
        minLength: [4, "The Brand should be at least 4 characters long"]
    },
    seats: {
        type: Number,
        required: [true, "The seats field can't be empty"],
        min: [0, "The Seats should be positive number (from 0 to 4 inclusive)."],
        max: [4, "The Seats should be positive number (from 0 to 4 inclusive)."]
    },
    price: {
        type: Number,
        required: [true, "The price's field can't be empty"],
        min: [1, "The Price should be positive number (from 1 to 50 inclusive)."],
        max: [50, "The Price should be positive number (from 1 to 50 inclusive)."]
    },
    description: {
        type: String,
        required: [true, "The description's field can't be empty"],
        minLength: [10, "The Description should be at least 10 characters long"]
    },
    buddies : {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }]
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export default model("Trip", tripSchema);